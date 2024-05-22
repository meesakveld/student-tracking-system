/**
 * ------------------------------
 *        RESULTS PAGE
 * ------------------------------
*/

export const resultsPage = (req, res) => {
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

    res.render('results', data);
};

export default resultsPage;
