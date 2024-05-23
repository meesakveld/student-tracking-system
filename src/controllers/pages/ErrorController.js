/**
 * ------------------------------
 *         ERROR PAGE
 * ------------------------------
*/

export const errorPage = (req, res) => {
    const data = {
        error: 'Not Found',
        errorCode: 404,
        message: 'De pagina die je zoekt bestaat niet.',
        layout: 'base',
    };

    res.status(data.errorCode).render('error', data);
};