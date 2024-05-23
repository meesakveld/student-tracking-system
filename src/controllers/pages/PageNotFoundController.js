/**
 * ------------------------------
 *        PAGE NOT FOUND
 * ------------------------------
*/

export const pageNotFound = (req, res) => {
    const data = {
        error: 'Page Not Found',
        message: 'Pagina niet gevonden.'
    };

    res.render('page-not-found', data);
};

export default pageNotFound;