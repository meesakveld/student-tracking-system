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
import * as auth from "./controllers/AuthController.js";

// Routes
import apiRoutes from "./routes/api/index.js";

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
app.get("/login", auth.login);
app.post("/login", auth.postLogin, auth.login);

app.get("/register", auth.register);
app.post("/register", auth.postRegister, auth.register);

app.get("/logout", auth.logout);


// Page Routes
app.get("/", () => {});


// API Routes
app.get("/api", apiRoutes);

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