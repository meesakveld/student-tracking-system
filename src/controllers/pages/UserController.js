/**
 * ------------------------------
 *          USER PAGE
 * ------------------------------
 */

export const userPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

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

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
        userInfo,
    };

    res.render('user', data);
};

export default userPage;
