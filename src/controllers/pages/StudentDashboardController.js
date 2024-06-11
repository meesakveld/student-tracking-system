/**
 * ------------------------------
 *          STUDENT PAGE
 * ------------------------------
*/

import { getStudentById } from '../../services/models/Student.js';
import { formatDate } from '../../utils/formatDate.js';
import { NODE_ENV as vrs } from '../../consts.js';

export const studentDashboardPage = async (req, res) => {

    try {

        const studentIsLoggedIn = req.user.role.title === "student";

        const student = await getStudentById(parseInt(req.params.studentId), '[user, class, attendances.[attendance_type, course], comments.course, status_registrations.status]');
        student.comments = student.comments.filter(comment => comment.visible_to_student === (studentIsLoggedIn ? (vrs === 'development' ? 1 : true) : (vrs === 'development' ? 0 : false)));
        student.comments = student.comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Most recent attendance
        const mostRecentAttendance = student.attendances && student.attendances.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        if (mostRecentAttendance) {
            mostRecentAttendance.date = mostRecentAttendance && formatDate(mostRecentAttendance.date);
        }
        const formatedAttendance = mostRecentAttendance && `${student.user.firstname} was ${mostRecentAttendance.attendance_type.title.toLowerCase()} op ${mostRecentAttendance.date} bij ${mostRecentAttendance.course.name}.`;

        // Most recent status
        const mostRecentStatus = student.status_registrations.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const formatedStatus = mostRecentStatus && `${student.user.firstname} is sinds ${formatDate(mostRecentStatus.created_at)} ${mostRecentStatus.status.title.toLowerCase()}.`;

        // Most recent course reports
        const mostRecentCourseReport = student.comments.filter(comment => comment.tag === "course").sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const formatedCourseReport = mostRecentCourseReport && `${mostRecentCourseReport.course.name} — ${formatDate(mostRecentCourseReport.created_at)} | ${mostRecentCourseReport.comment}`

        // Most recent personal reports
        const mostRecentPersonalReport = student.comments.filter(comment => comment.tag === "personal").sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const formatedPersonalReport = mostRecentPersonalReport && `${formatDate(mostRecentPersonalReport.created_at)} | ${mostRecentPersonalReport.comment}`

        // Most recent coaching reports
        const mostRecentCoachingReport = student.comments.filter(comment => comment.tag === "coaching").sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        const formatedCoachingReport = mostRecentCoachingReport && `${formatDate(mostRecentCoachingReport.created_at)} | ${mostRecentCoachingReport.comment}`

        // No data available
        const noDataAvailable = "Informatie nog niet van toepassing/niet beschikbaar.";

        const cards = [
            {
                "link": `/student-dashboard/${student.id}/attendance`,
                "title": "Aanwezigheden hoor- en werkcolleges",
                "description": formatedAttendance || noDataAvailable,
            },
            {
                "link": `/student-dashboard/${student.id}/status`,
                "title": "Status student",
                "description": formatedStatus || noDataAvailable,
            },
            {
                "link": `/student-dashboard/${student.id}/course-reports?type=course`,
                "title": "Vak gerelateerde verslagen",
                "description": formatedCourseReport || noDataAvailable,
            },
            {
                "link": `/student-dashboard/${student.id}/personal-reports?type=personal`,
                "title": "Persoonlijke verslagen",
                "description": formatedPersonalReport || noDataAvailable,
            },
            {
                "link": `/student-dashboard/${student.id}/coaching-reports?type=coaching`,
                "title": "Coaching verslagen",
                "description": formatedCoachingReport || noDataAvailable,
            },
            {
                "title": "Werkplekleren",
                "description": noDataAvailable,
                "locked": true
            }
        ];

        const pageTitle = `Student dashboard van: ${student.user.firstname} ${student.user.lastname}${student.class ? `  —  ${student.class.name}` : ""}`;

        const data = {
            user: req.user,
            pageTitle,
            cards,
            returnUrl: req.query.returnUrl || "/"
        };

        res.render('student', data);

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