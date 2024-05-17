/**
 * ------------------------------
 *        RESULTS PAGE
 * ------------------------------
*/

export const resultsPage = (req, res) => {
    const user = {
        name: "Philippe De Pauw",
        role: "Admin"
    };

    const schoolYears = [
        { value: "2021-2022", label: "2021-2022" },
        { value: "2022-2023", label: "2022-2023" },
        { value: "2023-2024", label: "2023-2024" }
    ];

    const classes = [
        { value: "PGM1-A", label: "PGM1-A" },
        { value: "PGM1-B", label: "PGM1-B" },
        { value: "PGM1-C", label: "PGM1-C" }
    ];

    const courses = [
        { value: "IT Business", label: "IT Business" },
        { value: "IT Communication", label: "IT Communication" }
    ];

    const teachers = [
        { value: "Isabelle Volckaert", label: "Isabelle Volckaert" },
        { value: "Philippe De Pauw", label: "Philippe De Pauw" }
    ];

    res.render('results', { user, schoolYears, classes, courses, teachers });
};

export default resultsPage;
