/**
 * ------------------------------
 *         OVERVIEW PAGE
 * ------------------------------
*/

export const overviewPage = (req, res) => {
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

    res.render("overview", data);
};

export default overviewPage;