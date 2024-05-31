/*
* ------------------------------
*        COMPONENTS PAGE
* ------------------------------
*/

import Comment from '../../models/Comment.js';
import { getStudentById } from '../../services/models/Student.js';
import { getCommentById } from '../../services/models/Comment.js';
import { employeeFunctionAuth } from '../../utils/employeeFunctionAuth.js';
import { formatDate } from '../../utils/formatDate.js'

export const commentsPage = async (req, res) => {

    const type = req.query.type
    if (type !== "course" && type !== "personal" && type !== "coaching") {
        return res.redirect("/error")
    }

    const comments = await Comment.query()
        .withGraphFetched('[employee.[user, functions], course]')
        .where(builder => {
            if (type) {
                builder.where('tag', type)
            }
        })
        .where('student_id', parseInt(req.params.studentId))
        .where(builder => {
            if (req.user.role.title === "student") {
                builder.where('visible_to_student', true)
            }
        })

    const formattedComments = comments.map((comment) => {
        return {
            title: `${formatDate(comment.created_at)}${comment.course ? ` — ${comment.course.name}` : ''} — ${comment.employee.user.firstname} ${comment.employee.user.lastname}`,
            text: comment.comment,
            ...comment
        }
    })

    const title = type === "course" ? "Vak gerelateerde verslagen" : type === "personal" ? "Persoonlijke verslagen" : "Coaching verslagen";

    let canAddComment = false;
    const isEmployee = req.user && req.user.role.title === "employee";
    switch (type) {
        case "course":
            if (isEmployee && req.user.employee.functions.find(f => f.title === "teacher")) {
                canAddComment = true;
            }
            break;
        case "personal":
            canAddComment = isEmployee
            break;
        case "coaching":
            if (isEmployee && employeeFunctionAuth(req.user.employee.functions, ["admin", "teamleader", "trajectory coach", "learning coach", "diversity coach", "workplace coach"])) {
                canAddComment = true;
            }
    }

    const data = {
        user: req.user,
        title: title,
        dataComments: formattedComments,
        canAddComment,
        studentId: req.params.studentId,
        returnUrl: `/student-dashboard/${req.params.studentId}`,
        addUrl: `/student-dashboard/${req.params.studentId}/${type}-reports/add`,
    };

    res.render('comments', data);

};


export const commentPage = async (req, res) => {

    const studentId = req.params.studentId;
    const reportId = req.params.reportId;
    const type = req.query.type;
    let convertedType = type;

    if (type !== "course" && type !== "personal" && type !== "coaching") {
        const data = {
            user: req.user,
            error: {
                message: 'Pagina niet gevonden',
                code: 404
            }
        }
        return res.render('error', data)
    }
    if (type === "course") convertedType = "Vak gerelateerd"
    if (type === "personal") convertedType = "Persoonlijk"
    if (type === "coaching") convertedType = "Coaching"

    const student = await getStudentById(studentId, '[user]');
    const comment = await getCommentById(reportId, '[employee.[user, functions], course]');

    const title = `${convertedType} verslag van ${student.user.firstname} ${student.user.lastname}`
    const section = {
        title: `${formatDate(comment.created_at)} — ${comment.employee.user.firstname} ${comment.employee.user.lastname}`,
        content: comment.comment,
    };

    const dropdownVisibility = {
        options: [
            {
                label: `Niet zichtbaar voor ${student.user.firstname}`,
                value: "0",
                selected: comment.visible_to_student
            },
            {
                label: `Zichtbaar voor ${student.user.firstname}`,
                value: "1",
                selected: comment.visible_to_student
            },
        ]
    };
    const dropdownCourses = {

    }

    const data = {
        user: req.user,
        title,
        section,
        mayEditComment: false,
        dropdownVisibility: dropdownVisibility,
        returnUrl: `/student-dashboard/${studentId}/${type}-reports?type=${type}`,
    };

    res.render('comment', data);
};


export const addCommentPage = (req, res) => {

    const dataLink = [{
        "url": `/student-dashboard/${req.user.id}/course-reports/add`
    }];
    const allowedRoles = ['admin', 'employee'];
    const canAddComment = req.user && allowedRoles;

    const data = {
        user: req.user,
        dataLink,
        canAddComment,
    };

    res.render('add-comment', data);
};