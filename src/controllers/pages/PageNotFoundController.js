/**
 * ------------------------------
 *        PAGE NOT FOUND
 * ------------------------------
*/

export const pageNotFound = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    const data = {
        user: {
            firstname,
            lastname,
            role,
        },
        error: 'Page Not Found',
        message: 'Pagina niet gevonden.'
    };

    res.render('page-not-found', data);
};

export default pageNotFound;