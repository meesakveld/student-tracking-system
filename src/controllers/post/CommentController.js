/*
    const comment = {
        course_id = optional -> If course_id is null then null else given value - integer
        student_id = required - integer
        employee_id = required - integer
        education_programme_id = required - integer
        comment = required - text
        visible_for_student = optional -> if visible_for_student is null then false else given value - boolean
        tag = optional -> If comment is "coaching" or "personal" or "course" add tag else null - string
    }

*/

import Comment from "../../models/Comment.js";

export const createComment = async (req, res, next) => {
    const course_id = req.body.course_id;
    const comment = req.body.comment;
    const student_id = req.body.student_id;
    const employee_id = req.body.employee_id;
    const education_programme_id = req.body.education_programme_id;
    const visible_for_student = req.body.visible_for_student;
    const tag = req.body.tag;

    const newComment = {
        course_id: course_id,
        student_id: student_id,
        employee_id: employee_id,
        education_programme_id: education_programme_id,
        comment: comment,
        visible_for_student: visible_for_student,
        tag: tag
    }

    // convert to json
    console.log(newComment)

    try {
        const comment = await Comment.query().insert(newComment);
        return res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const updateComment = async (req, res, next) => {

}

export const deleteComment = async (req, res, next) => {

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