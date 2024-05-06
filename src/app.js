/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import { VIEWS_PATH, PORT } from "./consts.js";
import cookieParser from "cookie-parser";


// Middleware


// Controllers


// Routes

/**
 * ------------------------------
 *       CONFIGURATION
 * ------------------------------
*/
const app = express();

// Make use of the cookie parser 🍪 middleware
app.use(cookieParser());

const hbs = create({
    extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

// Static files
app.use(express.static("public"));

// View the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
*/

// Auth routes
app.get("/login", () => {});
app.post("/login", () => {});

app.get("/register", () => {});
app.post("/register", () => {});

app.get("/logout", () => {});


// Page Routes
app.get("/", () => {});


// API Routes
app.get("/api", () => {});

// 404 Route
app.use('*', () => {});


/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
*/
app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}/.`);
});