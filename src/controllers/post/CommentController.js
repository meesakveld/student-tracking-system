/*
    const comment = {
        course_id = optional -> If course_id is null then null else given value - integer
        student_id = required - integer
        employee_id = required - integer
        education_programme_id = required - integer
        comment = required - text
        visible_to_student = optional -> if visible_to_student is null then false else given value - boolean
        tag = required -> If comment is "coaching" or "personal" or "course" add tag else null - string
    }

*/

import Comment from "../../models/Comment.js";
import { employeeFunctionAuth } from "../../utils/employeeFunctionAuth.js";

export const createComment = async (req, res, next) => {
    const course_id = req.body.course_id;
    const comment = req.body.comment;
    const student_id = req.body.student_id;
    const employee_id = req.body.employee_id;
    const education_programme_id = req.body.education_programme_id;
    const visible_to_student = req.body.visible_to_student;
    const tag = req.body.tag;

    if (tag !== "coaching" || tag !== "personal" || tag !== "course") {
        throw new Error("Invalid tag");
    }

    const newComment = {
        course_id: course_id,
        student_id: student_id,
        employee_id: employee_id,
        education_programme_id: education_programme_id,
        comment: comment,
        visible_to_student: visible_to_student,
        tag: tag
    }

    try {
        const comment = await Comment.query().insert(newComment);
        return res.status(200).json(comment);
    } catch (error) {
        req.pageError = error.message
        next()
    }
}

export const updateComment = async (req, res, next) => {
    const hasFullAccess = employeeFunctionAuth(req.user.employee.functions, ["admin", "teamleader"]);

    const comment_id = req.body.comment_id;
    const comment = req.body.comment;
    const visible_to_student = req.body.visible_to_student;
    const tag = req.body.tag;

    if (tag && tag !== "coaching" && tag !== "personal" && tag !== "course") {
        return res.status(400).json({ error: "Invalid tag" });
    }

    try {
        // Fetch the existing comment to get the author employee_id
        const existingComment = await Comment.query().findById(comment_id);
        if (!existingComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Check if the current user is the author or has full access
        if (req.user.employee.id === existingComment.employee_id || hasFullAccess) {
            const updatedComment = {
                comment: comment,
                visible_to_student: visible_to_student,
                tag: tag
            };

            // Update the comment
            const updated = await Comment.query().patchAndFetchById(comment_id, updatedComment);
            return res.status(200).json(updated);
        } else {
            return res.status(403).json({ error: "You do not have permission to update this comment" });
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
            return res.status(404).json({ error: "Comment not found" });
        }
        // Check if the current user is the author or has full access
        if (req.user.employee.id === existingComment.employee_id || hasFullAccess) {
            // Delete the comment
            await Comment.query().deleteById(comment_id);
            return res.status(200).json({ message: "Comment deleted successfully" });
        } else {
            return res.status(403).json({ error: "You do not have permission to delete this comment" });
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