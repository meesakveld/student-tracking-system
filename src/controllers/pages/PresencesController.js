/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/

export const presencesPage = (req, res) => {
    const usersTable = {
        headers: ["Aanwezig", "Naam", "Status"],
        rows: [
            {
                checkbox: true,
                statusClass: "active",
                cols: ["Mees Akveld", "Actief"],
                infoButton: true,
                studentButton: true,
            },
            {
                checkbox: true,
                statusClass: "inactive",
                cols: ["Benoît Biraguma", "Inactief"],
                infoButton: true,
                studentButton: true,
            },
            {
                checkbox: true,
                statusClass: "active",
                cols: ["Ella Jekale", "Actief"],
                infoButton: true,
                studentButton: true,
            },
            {
                checkbox: true,
                statusClass: "active",
                cols: ["Tristan De Ridder", "Actief"],
                infoButton: true,
                studentButton: true,
            },
        ],
    }

    const data = {
        user: req.user,
        usersTable,
    };

    res.render('presences', data);
};