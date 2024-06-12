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
import Student from '../../models/Student.js';
import Course from '../../models/Course.js';

export const commentsPage = async (req, res) => {

    try {

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
            .orderBy('created_at', 'desc')

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
            addUrl: `/student-dashboard/${req.params.studentId}/${type}-reports/add?type=${type}`,
        };

        res.render('comments', data);

    } catch (error) {
        console.log(error);
        const data = {
            user: req.user,
            error: {
                message: error.message,
                code: 500,
            },
        };
        res.status(data.error.code).render("error", data);
    }

};


export const commentPage = async (req, res) => {

    try {

        const hasFullAccess = req.user.role.title === "employee" && employeeFunctionAuth(req.user.employee.functions, ["admin", "teamleader"]);
        const isEmployee = req.user.role.title === "employee";

        const studentId = req.params.studentId;
        const reportId = req.params.reportId;
        const type = req.query.type;
        let convertedType = type;

        const reqComment = req.body.comment;
        const reqVisibleToStudent = parseInt(req.body.visible_to_student);
        const reqCourseId = parseInt(req.body.course_id) || (req.body.course_id ? 0 : null);

        if (type !== "course" && type !== "personal" && type !== "coaching") {
            throw new Error("Pagina niet gevonden")
        }
        if (type === "course") convertedType = "Vak gerelateerd"
        if (type === "personal") convertedType = "Persoonlijk"
        if (type === "coaching") convertedType = "Coaching"

        const comment = await getCommentById(reportId, '[employee.[user, functions], course.employees.user]');
        const student = await Student.query().findById(studentId).withGraphFetched('[user]')

        const commentWrittenByLoggedInUser = isEmployee && parseInt(req.user.employee.id) === comment.employee_id;

        const courses = await Course.query()
            .joinRelated('students')
            .where('student_id', studentId)
            .joinRelated(commentWrittenByLoggedInUser && 'employees')
            .where(builder => {
                if (commentWrittenByLoggedInUser) {
                    builder.where('employees.id', parseInt(req.user.employee.id))
                }
            })
            .where(builder => {
                if (req.user.role.title === "student" || (!commentWrittenByLoggedInUser && !hasFullAccess)) {
                    builder.findById(comment.course_id)
                }
            })


        const title = `${convertedType} verslag van ${student.user.firstname} ${student.user.lastname}`
        const section = {
            title: `${formatDate(comment.created_at)} — ${comment.employee.user.firstname} ${comment.employee.user.lastname}`,
            content: reqComment || comment.comment,
        };

        const courseOptions = courses.map(course => {
            return {
                label: course.name,
                value: course.id,
                selected: reqCourseId > 0 ? reqCourseId === course.id : reqCourseId === 0 ? false : comment.course_id === course.id
            }
        });

        const dropdowns = [
            {
                label: 'Vak:',
                name: 'course_id',
                id: 'courseDropdown',
                options: [
                    { label: 'Selecteer vak', value: 0, selected: !comment.course },
                    ...courseOptions
                ],
                visible: type === "course",
                disabled: true,
                inputClass: 'hide',
                form: 'comment'
            },
            {
                label: 'Zichtbaarheid:',
                name: 'visible_to_student',
                id: 'visibilityDropdown',
                options: [
                    {
                        label: `Niet zichtbaar voor ${student.user.firstname}`,
                        value: 0,
                        selected: reqVisibleToStudent !== null ? reqVisibleToStudent === 0 : comment.visible_to_student
                    },
                    {
                        label: `Zichtbaar voor ${student.user.firstname}`,
                        value: 1,
                        selected: reqVisibleToStudent !== null ? reqVisibleToStudent === 1 : comment.visible_to_student
                    },
                ],
                disabled: true,
                visible: req.user.role.title === "employee",
                inputClass: 'hide',
                form: 'comment'
            }
        ]

        let mayEditComment = req.user.role.title === "employee" && req.user.employee.id === comment.employee_id;
        if (req.user.employee && employeeFunctionAuth(req.user.employee.functions, ["admin", "teamleader"])) mayEditComment = true;

        const data = {
            user: req.user,
            title,
            section,
            comment: comment,
            mayEditComment: mayEditComment,
            pageError: req.pageError,
            flash: req.flash,
            dropdowns: dropdowns.filter(dropdown => dropdown.visible),
            returnUrl: req.query.returnUrl || `/student-dashboard/${studentId}/${type}-reports?type=${type}`,
        };

        res.render('comment', data);

    } catch (error) {
        console.log(error);
        const data = {
            user: req.user,
            error: {
                message: error.message,
                code: 500,
            },
        };
        res.status(data.error.code).render("error", data);
    }
};


export const addCommentPage = async (req, res) => {

    try {
        const hasFullAccess = employeeFunctionAuth(req.user.employee.functions, ["admin", "teamleader"]);

        const type = req.query.type;
        const studentId = req.params.studentId;

        const reqComment = req.body.comment;
        const reqVisibleToStudent = parseInt(req.body.visible_to_student);
        const reqCourseId = parseInt(req.body.course_id) || (req.body.course_id ? 0 : null);

        const student = await getStudentById(studentId, '[user]');

        const formattedType = type === "course" ? "Vak gerelateerd" : type === "personal" ? "Persoonlijk" : "Coaching";
        const title = `Nieuw ${formattedType.toLowerCase()} verslag voor ${student.user.firstname} ${student.user.lastname}`;

        if (type !== "course" && type !== "personal" && type !== "coaching") {
            throw new Error(`Pagina met tag ${type} niet gevonden`)
        }

        let courseOptions = [];
        if (type === "course") {
            const courses = await Course.query()
                .joinRelated('students')
                .where('students.id', parseInt(studentId))
                .joinRelated(!hasFullAccess && 'employees')
                .where(builder => {
                    if (!hasFullAccess) {
                        builder.where('employees.id', parseInt(req.user.employee.id))
                    }
                })
            courseOptions = courses.map(course => {
                return {
                    label: course.name,
                    value: course.id,
                    selected: reqCourseId > 0 ? reqCourseId === course.id : reqCourseId === 0
                }
            });
        }

        let dropdowns = [
            {
                label: 'Vak:',
                name: 'course_id',
                id: 'courseDropdown',
                options: [
                    { label: 'Selecteer vak', value: 0, selected: false },
                    ...courseOptions
                ],
                visible: type === "course",
                form: 'comment'
            },
            {
                label: 'Zichtbaarheid:',
                name: 'visible_to_student',
                id: 'visibilityDropdown',
                options: [
                    {
                        label: `Niet zichtbaar voor ${student.user.firstname}`,
                        value: 0,
                        selected: reqVisibleToStudent !== null ? reqVisibleToStudent === 0 : true
                    },
                    {
                        label: `Zichtbaar voor ${student.user.firstname}`,
                        value: 1,
                        selected: reqVisibleToStudent !== null ? reqVisibleToStudent === 0 : false
                    },
                ],
                visible: true,
                form: 'comment'
            }
        ]

        const data = {
            user: req.user,
            title: title,
            student: student,
            comment: {
                title: `Nieuw ${formattedType.toLowerCase()} verslag`,
                comment: reqComment,
                tag: type
            },
            dropdowns: dropdowns.filter(dropdown => dropdown.visible),
            pageError: req.pageError,
            flash: req.flash,
            returnUrl: `/student-dashboard/${studentId}/${type}-reports?type=${type}`,
        };

        res.render('add-comment', data);

    } catch (error) {
        console.log(error);
        const data = {
            user: req.user,
            error: {
                message: error.message,
                code: 500,
            },
        };
        res.status(data.error.code).render("error", data);
    };

}

export const handleComment = async (req, res, next) => {
    const method = req.body.method;

    if (method === "POST") {
        addCommentPage(req, res);
    } else if (method === "PATCH" || method === "DELETE") {
        commentPage(req, res, next);
    } else {
        return res.render('error', {
            user: req.user,
            error: {
                message: "Methode niet toegestaan",
                code: 405
            }
        })
    }
}