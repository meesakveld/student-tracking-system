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

    const data = {
        user: req.user,
        student,
        section,
    };

    res.render('student-detail', data);
}

export default studentDetailPage;