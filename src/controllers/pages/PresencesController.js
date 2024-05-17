export const presencesPage = (req, res) => {
    const user = {
        name: "Philippe De Pauw",
        role: "Admin"
    };

    const year = "2023-2024";
    const classGroup = "PGM1-C";
    const course = "IT Business";
    const teacher = "Isabelle Volckaert";

    const students = [
        { name: "Mees Akveld", present: true, inactive: false },
        { name: "Benoît Biraguma", present: false, inactive: true },
        { name: "Ella Jekale", present: true, inactive: false },
        { name: "Tristan De Ridder", present: true, inactive: false }
    ];

    res.render('presences', { user, year, class: classGroup, course, teacher, students });
};

export default presencesPage;