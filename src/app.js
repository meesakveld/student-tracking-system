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
import studentPage from "./controllers/pages/StudentController.js";
import studentDetailPage from "./controllers/pages/StudentDetailController.js";
import searchStudentPage from "./controllers/pages/SearchStudentController.js";
import userPage from "./controllers/pages/UserController.js";
import resultsPage from "./controllers/pages/ResultsController.js";
import presencesPage from "./controllers/pages/PresencesController.js";
import pageNotFound from "./controllers/pages/PageNotFoundController.js";
import unauthorizedPage from "./controllers/pages/UnauthorizedController.js";
import teachersPage from "./controllers/pages/TeachersController.js";

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

// —— Public routes | Error routes ——
app.get(pageNotFound);
app.get(unauthorizedPage);

// —— Private routes ——
app.get('/', dashboardPage);
app.get('/users', usersPage);
app.get('/users/:id', userPage);
// to be checked because a user can be a student/teacher/admin but the studentPage only exists for students so what should be the route
app.get('/student/:id', studentPage);
app.get('/student/:id/:detail', studentDetailPage);
app.get('/search-student', searchStudentPage);
app.get('/results', resultsPage);
app.get('/presences', presencesPage);
app.get('/teachers', teachersPage);
// temporary page to show all components leave it here for now
app.get('/components', componentsPage);

// API Routes
app.use("/api", apiRoutes);

// 404 Route
app.use('*', pageNotFound);

/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
*/
app.listen(PORT, () => {
    console.log(`Application is running on http://localhost:${PORT}/.`);
});