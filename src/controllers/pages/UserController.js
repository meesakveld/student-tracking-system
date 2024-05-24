/**
 * ------------------------------
 *          USER PAGE
 * ------------------------------
 */

export const userPage = (req, res) => {
    const userInfo = {
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

    const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

    const pageTitle = `Informatie over: ${userInfo.firstName} ${userInfo.lastName}`;

    const data = {
        user: req.user,
        pageTitle,
        userInfo,
        labels
    };

    res.render('user', data);
};

export default userPage;
