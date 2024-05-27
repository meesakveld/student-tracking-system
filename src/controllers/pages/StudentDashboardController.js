/**
 * ------------------------------
 *          STUDENT PAGE
 * ------------------------------
*/

import { getStudentById } from '../../services/models/Student.js';

export const studentDashboardPage = async (req, res) => {
    const student = await getStudentById(parseInt(req.params.studentId), '[user, class, attendances.[attendance_type, course]]')

    const mostRecentAttendance = student.attendances.sort((a, b) => new Date(b.date) - new Date(a.date))[0];


    const cards = [
        {
            "link": `/student-dashboard/${student.id}/attendance`,
            "title": "Aanwezigheden hoor- en werkcolleges",
            "description": `Tijdens afgelopen les van ${mostRecentAttendance.course.name} was ${student.user.firstname}: ${mostRecentAttendance.attendance_type.title}`
        },
        {
            "link": `/student-dashboard/${student.id}/course-reports`,
            "title": "Vak gerelateerde verslagen",
            "description": "Mees heeft tijdens de colleges actief deelgenomen en waardevolle inzichten gedeeld met de groep.",
        },
        {
            "link": `/student-dashboard/${student.id}/personal-reports`,
            "title": "Persoonlijke verslagen",
            "description": "Mees heeft consistent sterke prestaties geleverd bij het uitvoeren van opdrachten en oefeningen, waarbij hij complexe problemen effectief heeft aangepakt."
        },
        {
            "link": "/student-dashboard/1/aanwezigheid-hoor-en-werkcolleges",
            "title": "Status student",
            "description": "Mees heeft een uitstekende academische status behouden gedurende het semester, met consistente inzet en uitmuntende resultaten."
        },
        {
            "link": "/student-dashboard/1/aanwezigheid-hoor-en-werkcolleges",
            "title": "Coaching verslagen",
            "description": "Mees heeft aanzienlijke vooruitgang geboekt dankzij de individuele coachingssessies, waarbij hij zijn vaardigheden en zelfvertrouwen heeft ontwikkeld. Verdere coaching is niet vereist."
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