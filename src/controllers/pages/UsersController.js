/**
 * ------------------------------
 *          USERS PAGE
 * ------------------------------
*/

export const usersPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    const userFilters = [
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

    const usersTable = {
        headers: ["Naam", "Rol", "Opleiding", "Status", "Vervaldatum"],
        rows: [
            {
                statusClass: "active",
                cols: ["Philippe De Pauw", "Admin", "Programmeren", "Actief", "-"],
                deleteButton: true,
                editButton: true
            },
            {
                statusClass: "active",
                cols: ["Adriaan Glibert", "Docent", "Programmeren", "Actief", "-"],
                deleteButton: true,
                editButton: true
            },
            {
                statusClass: "inactive",
                cols: ["Lisa De Backer", "Werkplekbegeleider", "Programmeren", "Inactief", "30/04/2024"],
                deleteButton: true,
                editButton: true
            },
            {
                statusClass: "active",
                cols: ["Philippe De Pauw", "Admin", "Programmeren", "Actief", "-"],
                deleteButton: true,
                editButton: true
            },
            {
                statusClass: "active",
                cols: ["Adriaan Glibert", "Docent", "Programmeren", "Actief", "-"],
                deleteButton: true,
                editButton: true
            },
            {
                statusClass: "inactive",
                cols: ["Lisa De Backer", "Werkplekbegeleider", "Programmeren", "Inactief", "30/04/2024"],
                deleteButton: true,
                editButton: true
            }
        ]
    };

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
        userFilters,
        usersTable
    };

    res.render("users", data);
};

export default usersPage;