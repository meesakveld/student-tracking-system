/**
 * ------------------------------
 *  ADD EDUCATION PROGRAMME PAGE
 * ------------------------------
*/

export const addEducationProgrammePage = async (req, res) => {
     // ——— RENDER DATA ———
    const data = {
        user: req.user,
    };
    res.render('add-education-programme', data);
};