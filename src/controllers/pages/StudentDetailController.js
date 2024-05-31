/**
 * ------------------------------
 *      STUDENT DETAIL PAGE
 * ------------------------------
 */

export const studentDetailPage = (req, res) => {
    const student = {
        firstName: "Mees",
        lastName: "Akveld",
        email: "mees.ak@student.arteveldehs.be",
        class: "PGM1-C",
        studyYear: "2023-2024",
        status: "Werkstudent",
        role: "Ambassadeur",
        coach: "Isabelle Volckaert",
        workCoach: "Viktor Verhaeghe",
        workMentor: "Lander De Vos",
        labels: ["Ambassadeur", "Stuver"]
    };

    const section = {
        title: "Aanwezigheid hoor- en werkcolleges",
        content: "Mees heeft alle colleges en workshops regelmatig bijgewoond. Hij heeft grote toewijding getoond en actief deelgenomen aan de lessen."
    };

    const pageTitle = `Studentenfiche van: ${student.firstName} ${student.lastName}`;

    const isUser = req.user && req.user.email === student.email;
    const isAdmin = req.user && req.user.roles.includes('administrator');
    const isTeamLeader = req.user && req.user.roles.includes('teamleader');

    const showEditButton = isUser || isAdmin || isTeamLeader;

    const data = {
        user: req.user,
        pageTitle,
        student,
        section,
        showEditButton,
    };

    res.render('student-detail', data);
}