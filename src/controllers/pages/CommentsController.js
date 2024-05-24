/**
 * ------------------------------
 *        COMPONENTS PAGE
 * ------------------------------
*/

export const commentsPage = (req, res) => {
    const dataComments = [
        {
            canView: true,
            title: "Werkcollege CV",
            text: "Mees heeft een goed gevulde CV. De opmaak is professioneel en overzichtelijk. De relevante ervaring en vaardigheden zijn duidelijk beschreven. Bovendien toont de CV een goede balans tussen opleiding en werkervaring."
        }
    ];

    const data = {
        user: req.user,
        dataComments
    };

    res.render('comments', data);
};

export default commentsPage;
