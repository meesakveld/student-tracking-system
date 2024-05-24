/**
 * ------------------------------
 *        DASHBOARD PAGE
 * ------------------------------
*/

export const dashboardPage = (req, res) => {
    const data = {
        user: req.user,
    };

    res.render("dashboard", data);
};