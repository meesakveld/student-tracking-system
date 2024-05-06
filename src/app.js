/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
 */
import express from "express";
import { create } from "express-handlebars";
import { VIEWS_PATH, PORT } from "./consts.js";


// middleware
// controllers

/**
 * ------------------------------
 *       CONFIGURATION
 * ------------------------------
 */
const app = express();

const hbs = create({
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

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