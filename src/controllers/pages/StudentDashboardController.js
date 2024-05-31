/**
 * ------------------------------
 *          STUDENT PAGE
 * ------------------------------
*/

import { getStudentById } from '../../services/models/Student.js';
import { formatDate } from '../../utils/formatDate.js';

export const studentDashboardPage = async (req, res) => {
    const student = await getStudentById(parseInt(req.params.studentId), '[user, class, attendances.[attendance_type, course], comments.course, status_registrations.status]')

    // Most recent attendance
    const mostRecentAttendance = student.attendances.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    mostRecentAttendance.date = mostRecentAttendance && formatDate(mostRecentAttendance.date);
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
    const noDateAvailable = "Informatie nog niet van toepassing/niet beschikbaar.";

    const cards = [
        {
            "link": `/student-dashboard/${student.id}/attendance`,
            "title": "Aanwezigheden hoor- en werkcolleges",
            "description": formatedAttendance || noDateAvailable,
        },
        {
            "link": `/student-dashboard/${student.id}/status`,
            "title": "Status student",
            "description": formatedStatus || noDateAvailable,
        },
        {
            "link": `/student-dashboard/${student.id}/course-reports`,
            "title": "Vak gerelateerde verslagen",
            "description": formatedCourseReport || noDateAvailable,
        },
        {
            "link": `/student-dashboard/${student.id}/personal-reports`,
            "title": "Persoonlijke verslagen",
            "description": formatedPersonalReport || noDateAvailable,
        },
        {
            "link": `/student-dashboard/${student.id}/coaching-reports`,
            "title": "Coaching verslagen",
            "description": formatedCoachingReport || noDateAvailable,
        },
        {
            "title": "Werkplekleren",
            "description": "Informatie nog niet van toepassing/niet beschikbaar.",
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
};