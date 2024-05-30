/**
 * ------------------------------
 *         WELCOME PAGE
 * ------------------------------
*/

export const welcomePage = (req, res) => {
    res.render("welcome", { layout: "base" });
};