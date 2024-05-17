/**
 * ------------------------------
 *          USERS PAGE
 * ------------------------------
*/

export const usersPage = (req, res) => {
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

    res.render("users", data);
};

export default usersPage;