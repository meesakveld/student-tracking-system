/**
 * ------------------------------
 *          USER PAGE
 * ------------------------------
 */

export const userPage = (req, res) => {
    const user = {
        name: "Philippe De Pauw",
        role: "Admin"
    };

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

    res.render('user', { user, student });
};

export default userPage;
