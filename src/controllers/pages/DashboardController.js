/**
 * ------------------------------
 *        DASHBOARD PAGE
 * ------------------------------
*/

export const dashboardPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    console.log("User data: ", req.user);

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
    };

    res.render("dashboard", data);
};