/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import * as ctr from "../../controllers/pages/index.js";

// Middleware
import jwtAuth from "../../middleware/jwtAuth.js";
import roleAuth from "../../middleware/roleAuth.js";


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
router.get('/users', roleAuth(["employee", "student"], ["teacher"]), ctr.usersPage);
router.get('/users/:id', ctr.userPage);
router.get('/student/:id', ctr.studentPage);
router.get('/student/:id/:detail', ctr.studentDetailPage);
router.get('/search-student', ctr.searchStudentPage);
router.get('/results', ctr.resultsPage);
router.get('/presences', ctr.presencesPage);
router.get('/teachers', ctr.teachersPage);

export default router;