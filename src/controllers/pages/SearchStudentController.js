/**
 * ------------------------------
 *      SEARCH STUDENT PAGE
 * ------------------------------
*/

export const searchStudentPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    const searchStudentChoices = [
        {
            name: "schoolyear",
            title: "Kies een schooljaar:",
            choices: [
                { value: "2021-2022", label: "2021-2022" },
                { value: "2022-2023", label: "2022-2023" },
                { value: "2023-2024", label: "2023-2024" }
            ]
        },
        {
            name: "class",
            title: "Kies een klas:",
            choices: [
                { value: "PGM1-A", label: "PGM1-A" },
                { value: "PGM1-B", label: "PGM1-B" },
                { value: "PGM1-C", label: "PGM1-C" }
            ]
        },
        {
            name: "course",
            title: "Kies een vak:",
            choices: [
                { value: "IT Business", label: "IT Business" },
                { value: "IT Communication", label: "IT Communication" }
            ]
        },
        {
            name: "teacher",
            title: "Kies een docent:",
            choices: [
                { value: "Isabelle Volckaert", label: "Isabelle Volckaert" },
                { value: "Philippe De Pauw", label: "Philippe De Pauw" }
            ]
        }
    ];

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
        searchStudentChoices,
    };

    res.render('search-student', data);
};

export default searchStudentPage;