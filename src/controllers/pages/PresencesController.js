/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/

export const presencesPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    // From the selected class group, we have the following students:
    const students = [
        { name: "Mees Akveld", present: true, inactive: false },
        { name: "Benoît Biraguma", present: false, inactive: true },
        { name: "Ella Jekale", present: true, inactive: false },
        { name: "Tristan De Ridder", present: true, inactive: false }
    ];

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
        students,
    };

    res.render('presences', data);
};

export default presencesPage;