/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
 */
import { create } from "express-handlebars";

// middleware
// controllers

/**
 * ------------------------------
 *       CONFIGURATION
 * ------------------------------
 */

const hbs = create({
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
 */

/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
 */
app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}/.`);
});