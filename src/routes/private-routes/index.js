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
 *        ROUTING — GET
 * ------------------------------
*/

router.get('/', ctr.dashboardPage);

router.get('/users', roleAuth(["employee"], ["admin"]), ctr.usersPage);
router.get('/users/:id', roleAuth(["employee", "student"]), studentIdAuth, ctr.userPage);

router.get('/education-programs', roleAuth(["employee"], ["admin"]), (req, res) => {res.json({message: "Education Programs"})});

router.get('/student-dashboard/:studentId', roleAuth(["employee", "student"]), studentIdAuth, ctr.studentDashboardPage);
router.get('/student-dashboard/:studentId/:detail', roleAuth(["employee", "student"]), studentIdAuth, ctr.commentsPage);
router.get('/student-dashboard/:studentId/:detail/edit', roleAuth(["employee"]), ctr.studentDetailPage);

router.get('/search-students', roleAuth(["employee"]), ctr.searchStudentPage);
router.get('/search-employees', roleAuth(["employee"], ["teamleader"]), (req, res) => {res.json({message: "Search Employees"})});

router.get('/attendance', ctr.presencesPage);
router.get('/participation', (req, res) => {res.json({message: "Participation"})});
router.get('/coach-reports', (req, res) => {res.json({message: "Coach Reports"})});

router.get('/teachers', ctr.teachersPage);

export default router;