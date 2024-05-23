/**
 * ------------------------------
 *      SEARCH STUDENT PAGE
 * ------------------------------
*/

export const searchStudentPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    const userFilters = [
        {
            id: "filter1",
            name: "filterProgramme",
            labelText: "Kies een opleiding:",
            options: [
                { value: "graduaat-programmeren", label: "Graduaat Programmeren" },
                { value: "digitale-vormgeving", label: "Digitale Vormgeving" },
            ]
        },
        {
            id: "filter2",
            name: "filterRole",
            labelText: "Kies een schooljaar:",
            options: [
                { value: "2023-2024", label: "2023-2024" },
                { value: "2022-2023", label: "2022-2023" },
                { value: "2021-2022", label: "2021-2022" },
            ]
        },
        {
            id: "filter3",
            name: "filterProgram",
            labelText: "Kies een klas:",
            options: [
                { value: "PGM1-A", label: "PGM1-A" },
                { value: "PGM1-B", label: "PGM1-B" },
                { value: "PGM1-C", label: "PGM1-C" },
            ]
        },
        {
            id: "filter4",
            name: "filterStatus",
            labelText: "Kies een vak:",
            options: [
                { value: "it-business", label: "IT Business" },
                { value: "it-communication", label: "IT Communication" },
            ]
        }
    ];

    const usersTable = {
        headers: ["Naam", "Opleiding", "Status"],
        rows: [
            {
                statusClass: "active",
                cols: ["Mees Akveld", "Programmeren", "Actief"],
                infoButton: true,
                studentButton: true,
            },
            {
                statusClass: "inactive",
                cols: ["Benoît Biraguma", "Programmeren", "Inactief"],
                infoButton: true,
                studentButton: true,
            },
            {
                statusClass: "active",
                cols: ["Ella Jekale", "Programmeren", "Actief"],
                infoButton: true,
                studentButton: true,
            },
            {
                statusClass: "active",
                cols: ["Tristan De Ridder", "Programmeren", "Actief"],
                infoButton: true,
                studentButton: true,
            },
        ],
    }

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
        userFilters,
        usersTable,
    };

    res.render('search-student', data);
};

export default searchStudentPage;