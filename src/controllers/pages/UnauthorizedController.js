/**
 * ------------------------------
 *       UNAUTHORIZED PAGE
 * ------------------------------
*/

export const unauthorizedPage = (req, res) => {
    const data = {
        error: 'Unauthorized',
        message: 'Authorisatie vereist. Gelieve in te loggen.'
    };

    res.status(401).render('401', data);
};

export default unauthorizedPage;