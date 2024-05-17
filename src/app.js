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
import jwtAuth from "./middleware/jwtAuth.js";
import AuthLoginValidation from "./middleware/validation/AuthLoginValidation.js";

// Controllers
import * as auth from "./controllers/AuthController.js";
// Page controllers
import welcomePage from './controllers/pages/WelcomeController.js';
import dashboardPage from "./controllers/pages/DashboardController.js";
import componentsPage from "./controllers/pages/ComponentsController.js";
import usersPage from "./controllers/pages/UsersController.js";

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

// —— Public routes | Auth routes ——
app.get('/welcome', welcomePage);

app.get("/login", jwtAuth, auth.login);
app.post("/login", AuthLoginValidation ,auth.postLogin, auth.login);

app.get("/logout", auth.logout);


// —— Private routes ——
app.get('/', jwtAuth ,dashboardPage);
app.get('/users', jwtAuth, usersPage);

// API Routes
app.get("/api", apiRoutes);

// 404 Route
app.use('*', (req, res) => { res.redirect("/"); });

app.get('/components', componentsPage);

/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
*/
app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}/.`);
});