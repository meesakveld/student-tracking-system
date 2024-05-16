/**
 * ------------------------------
 *        DASHBOARD PAGE
 * ------------------------------
*/

export const dashboardPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    res.render("dashboard", {
        firstname,
        lastname,
        role,
    });
};

export default dashboardPage;