/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";
import jwtAuth from "../../middleware/authentication/jwtAuth.js";

// Controllers
import * as ctr from "../../controllers/pdf/index.js";

// Middleware

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

// —— Private routes ——
router.get('/student-dashboard/:studentId/attendance', ctr.renderAttendanceTemplate);
router.get('/student-dashboard/:studentId/status', ctr.renderAttendanceTemplate);
router.get('/student-dashboard/:studentId/course-reports', ctr.renderAttendanceTemplate);
router.get('/student-dashboard/:studentId/personal-reports', ctr.renderAttendanceTemplate);
router.get('/student-dashboard/:studentId/coaching-reports', ctr.renderAttendanceTemplate);


export default router;