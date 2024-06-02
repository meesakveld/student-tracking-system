import Comment from "../../models/Comment.js";
import Course from "../../models/Course.js";
import EducationProgramme from "../../models/EducationProgramme.js";
import { employeeFunctionAuth } from "../../utils/employeeFunctionAuth.js";
import { validationResult } from "express-validator";

export const createComment = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.pageError = errors.array().map(error => error.msg).join(", ");
        return next();
    }

    const course_id = parseInt(req.body.course_id);
    const comment = req.body.comment;
    const student_id = parseInt(req.body.student_id);
    const employee_id = parseInt(req.user.employee.id);
    let education_programme_id = NaN;
    const visible_to_student = parseInt(req.body.visible_to_student);
    const tag = req.body.tag;

    if (tag === "course" && !course_id) {
        req.pageError = "Een vak is verplicht voor dit type verslag.";
        return next();
    }

    if (course_id) {
        const course = await Course.query().findById(course_id);
        if (!course) {
            req.pageError = "Vak met id " + course_id + " niet gevonden";
            return next();
        }

        const educationProgramme = await EducationProgramme.query().findById(course.education_programme_id);
        education_programme_id = educationProgramme.id;
    } else {
        const educationProgramme = await EducationProgramme.query()
            .joinRelated("students")
            .where("students.id", student_id)
            .first();

        if (!educationProgramme) {
            req.pageError = "Opleiding niet gevonden voor student met id " + student_id;
            return next();
        }

        education_programme_id = educationProgramme.id;
    }

    const newComment = {
        student_id: student_id,
        employee_id: employee_id,
        education_programme_id: education_programme_id,
        comment: comment,
        visible_to_student: visible_to_student === 1 ? true : false,
        tag: tag
    }

    if (tag === "course") {
        newComment.course_id = course_id;
    }

    try {
        const comment = await Comment.query().insert(newComment);
        return res.redirect("/student-dashboard/" + student_id + `/${tag}-reports/${comment.id}?type=${tag}`);
    } catch (error) {
        req.pageError = error.message
        next()
    }
}

export const updateComment = async (req, res, next) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.pageError = errors.array().map(error => error.msg).join(", ");
        return next();
    }
    
    const hasFullAccess = employeeFunctionAuth(req.user.employee.functions, ["admin", "teamleader"]);
    const comment_id = parseInt(req.body.comment_id);
    const comment = req.body.comment;
    const visible_to_student = parseInt(req.body.visible_to_student)
    const course_id = parseInt(req.body.course_id)
    const tag = req.body.tag;

    if (tag === "course" && !course_id) {
        req.pageError = "Een vak is verplicht voor dit type verslag.";
        return next();
    }

    try {
        // Fetch the existing comment to get the author employee_id
        const existingComment = await Comment.query().findById(comment_id);
        if (!existingComment) {
            req.pageError = "Verwijderen mislukt! Verslag met id " + comment_id + " niet gevonden";
            return next();
        }

        // Check if the current user is the author or has full access
        if (req.user.employee.id === existingComment.employee_id || hasFullAccess) {
            const updatedComment = {
                comment: comment,
                visible_to_student: visible_to_student === 1 ? true : false,
                tag: tag
            };
            
            if (tag === "course") {
                updatedComment.course_id = course_id;
            }

            // Update the comment
            const updated = await Comment.query().findById(comment_id).patch(updatedComment);
            req.flash = "Gelukt! Het verslag is bijgewerkt";
            return next();
        } else {
            req.pageError = "Je hebt geen toestemming om dit verslag bij te werken";
            return next();
        }
    } catch (error) {
        console.error("Error updating comment:", error);
        req.pageError = error.message;
        next();
    }
};

export const deleteComment = async (req, res, next) => {

    const hasFullAccess = employeeFunctionAuth(req.user.employee.functions, ["admin", "teamleader"]);

    const comment_id = req.body.comment_id;
    try {
        // Fetch the existing comment to check the author employee_id
        const existingComment = await Comment.query().findById(comment_id);
        if (!existingComment) {
            req.pageError = "Verwijderen mislukt! Verslag met id " + comment_id + " niet gevonden";
            return next();
        }
        // Check if the current user is the author or has full access
        if (req.user.employee.id === existingComment.employee_id || hasFullAccess) {
            // Delete the comment
            await Comment.query().deleteById(parseInt(comment_id));
            res.redirect("/student-dashboard/" + req.params.studentId + `/${req.body.tag}-reports?type=${req.body.tag}`);
        } else {
            req.pageError = "Je hebt geen toestemming om dit verslag te verwijderen";
            return next();
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        req.pageError = error.message;
        next();
    }

}

export const handleComment = async (req, res, next) => {
    const method = req.body.method;

    if (method === "POST") {
        createComment(req, res, next);
    }

    if (method === "PATCH") {
        updateComment(req, res, next);
    }

    if (method === "DELETE") {
        deleteComment(req, res, next);
    }

}