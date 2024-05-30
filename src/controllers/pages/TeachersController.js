/**
 * ------------------------------
 *        TEACHERS PAGE
 * ------------------------------
*/

export const teachersPage = (req, res) => {
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
        user: req.user,
        teachersTable
    };

    res.render('teachers', data);
};