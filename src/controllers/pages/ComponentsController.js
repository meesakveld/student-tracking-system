/**
 * ------------------------------
 *        COMPONENTS PAGE
 * ------------------------------
*/

export const componentsPage = (req, res) => {
const section = {
        title: "Aanwezigheid hoor- en werkcolleges",
        content: "Mees heeft alle colleges en workshops regelmatig bijgewoond. Hij heeft grote toewijding getoond en actief deelgenomen aan de lessen."
    };

    const labels = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];

    const choiceLists = [
        {
            title: "Kies een klas:",
            name: "choice1",
            choices: [
                { value: "choice1", label: "Class 1" },
                { value: "choice2", label: "Class 2" },
                { value: "choice3", label: "Class 3" }
            ]
        },
        {
            title: "Kies een klas:",
            name: "choice2",
            choices: [
                { value: "choice1", label: "Class 1" },
                { value: "choice2", label: "Class 2" },
                { value: "choice3", label: "Class 3" }
            ]
        },
        {
            title: "Kies een klas:",
            name: "choice3",
            choices: [
                { value: "choice1", label: "Class 1" },
                { value: "choice2", label: "Class 2" },
                { value: "choice3", label: "Class 3" }
            ]
        }
    ];

    const dropdown = {
        labelText: "Kies een programmalijn",
        options: [
            { value: "vak1", label: "Programmalijn-1" },
            { value: "vak2", label: "Programmalijn-2" },
            { value: "vak3", label: "Programmalijn-3" }
        ]
    };

    const filters = [
        {
            id: "filter1",
            name: "filterRole",
            labelText: "Filter op rol:",
            options: [
                { value: "all", label: "Alle rollen" },
                { value: "teachers", label: "Docenten" },
                { value: "coaches", label: "Leercoaches" },
                { value: "teamleaders", label: "Teamleiders" }
            ]
        },
        {
            id: "filter2",
            name: "filterRole",
            labelText: "Filter op rol:",
            options: [
                { value: "all", label: "Alle rollen" },
                { value: "teachers", label: "Docenten" },
                { value: "coaches", label: "Leercoaches" },
                { value: "teamleaders", label: "Teamleiders" }
            ]
        },
        {
            id: "filter3",
            name: "filterProgram",
            labelText: "Filter op opleiding:",
            options: [
                { value: "all", label: "Alle opleidingen" },
                { value: "programming", label: "Programmeren" },
                { value: "design", label: "DVG" }
            ]
        },
        {
            id: "filter4",
            name: "filterStatus",
            labelText: "Filter op status:",
            options: [
                { value: "all", label: "Alle status" },
                { value: "active", label: "Actief" },
                { value: "inactive", label: "Inactief" }
            ]
        }
    ];

    // Users table could also be a students table
    const usersTable = {
        headers: ["Naam", "Opleiding", "Status"],
        rows: [
            {
                statusClass: "active",
                cols: ["Mees Akveld", "Programmeren", "Actief"],
                infoButton: true,
                studentButton: true,
                deleteButton: true,
                editButton: true
            },
            {
                statusClass: "inactive",
                cols: ["Benoît Biraguma", "Programmeren", "Inactief"],
                infoButton: true,
                studentButton: true,
                deleteButton: true,
                editButton: true
            },
            {
                statusClass: "active",
                cols: ["Ella Jekale", "Programmeren", "Actief"],
                infoButton: true,
                studentButton: true,
                deleteButton: true,
                editButton: true
            },
            {
                statusClass: "active",
                cols: ["Tristan De Ridder", "Programmeren", "Actief"],
                infoButton: true,
                studentButton: true,
                deleteButton: true,
                editButton: true
            },
        ],
    }

    const data = {
        user: req.user,
        section,
        labels,
        choiceLists,
        dropdown,
        filters,
        usersTable
    };

    res.render("components", data);
};