import dotenv from 'dotenv';
dotenv.config();

/**
 * ------------------------------
 *          HOME PAGE
 * ------------------------------
*/

export const homePage = (req, res) => {
    res.render("home");
};