/**
 * ------------------------------
 *        RESULTS PAGE
 * ------------------------------
*/

export const resultsPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

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
        usersTable
    };

    res.render('results', data);
};