/*
* ------------------------------
*        COMPONENTS PAGE
* ------------------------------
*/

import Comment from '../../models/Comment.js';
import { formatDate } from '../../utils/formatDate.js'

export const commentsPage = async (req, res) => {

    const type = req.query.type
    if (type !== "course" && type !== "personal" && type !== "coaching") {
        return res.redirect("/error")
    }

    const comments = await Comment.query()
        .withGraphFetched('[employee.user, course]')
        .where(builder => {
            if (type) {
                builder.where('tag', type)
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

    const data = {
        user: req.user,
        title: title,
        dataComments: formattedComments,
        returnUrl: `/student-dashboard/${req.params.studentId}`,
        addUrl: `/student-dashboard/${req.params.studentId}/${type}-reports/add`,
    };

    res.render('comments', data);

};


export const commentPage = (req, res) => {
    const comment = "sdfgkjsdfjds sdfds sdkf sdf sdfj sdfsd"

    const data = {
        user: req.user,
        comment,
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