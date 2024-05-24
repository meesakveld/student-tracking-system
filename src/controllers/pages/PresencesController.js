/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/

export const presencesPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

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
        user: {
            firstname,
            lastname,
            role,
        },
        usersTable,
    };

    res.render('presences', data);
};