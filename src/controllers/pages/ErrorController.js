/**
 * ------------------------------
 *         ERROR PAGE
 * ------------------------------
*/

export const errorPage = (req, res) => {
    const firstname = "Philippe";
    const lastname = "De Pauw - Waterschoot";
    const role = "Admin";

    const data = {
        user: req.user,
        error: {
            code: 404,
            message: 'Pagina niet gevonden.',
        },
    };

    res.status(data.error.code).render('error', data);
};