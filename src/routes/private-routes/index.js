/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import * as ctr from "../../controllers/pages/index.js";

// Middleware
import jwtAuth from "../../middleware/authentication/jwtAuth.js";
import roleAuth from "../../middleware/authentication/roleAuth.js";
import studentIdAuth from "../../middleware/authentication/studentIdAuth.js";


/**
 * ------------------------------
 *        CONFIGURATION
 * ------------------------------
*/

const router = Express.Router();

router.use(jwtAuth);

/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
*/

router.get('/', ctr.dashboardPage);
router.get('/users', roleAuth(["employee"], ["admin"]), ctr.usersPage);
router.get('/users/:id', roleAuth(["employee", "student"]), studentIdAuth, ctr.userPage);
router.get('/student/:id', ctr.studentPage);
router.get('/student/:id/:detail', ctr.commentsPage);
router.get('/student/:id/:detail/edit', ctr.studentDetailPage);
router.get('/search-student', roleAuth(["employee"]), ctr.searchStudentPage);
router.get('/results', ctr.resultsPage);
router.get('/presences', ctr.presencesPage);
router.get('/teachers', ctr.teachersPage);

export default router;