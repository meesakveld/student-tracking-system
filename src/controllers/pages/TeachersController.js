/**
 * ------------------------------
 *        TEACHERS PAGE
 * ------------------------------
*/

export const teachersPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    const teachersTable = {
        headers: ["Naam", "Rollen", "Opleiding", "Status"],
        rows: [
            {
                statusClass: "active",
                cols: ["Adriaan Glibert", "Docent", "Programmeren", "Actief"],
                infoButton: true,
            },
            {
                statusClass: "active",
                cols: ["Adriaan Glibert", "Docent", "Programmeren", "Actief"],
                infoButton: true,
            },
            {
                statusClass: "active",
                cols: ["Adriaan Glibert", "Docent", "Programmeren", "Actief"],
                infoButton: true,
            },
            {
                statusClass: "active",
                cols: ["Adriaan Glibert", "Docent", "Programmeren", "Actief"],
                infoButton: true,
            },
            {
                statusClass: "active",
                cols: ["Adriaan Glibert", "Docent", "Programmeren", "Actief"],
                infoButton: true,
            },
        ],
    }

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
        teachersTable
    };

    res.render('teachers', data);
};

export default teachersPage;