/**
 * ------------------------------
 *        DASHBOARD PAGE
 * ------------------------------
*/

export const dashboardPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
    };

    res.render("dashboard", data);
};

export default dashboardPage;