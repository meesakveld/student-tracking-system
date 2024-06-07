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
router.get('/student-dashboard/:studentId/attendance', ctr.renderAttendanceTemplateAttendance);
router.get('/student-dashboard/:studentId/status', ctr.renderAttendanceTemplateStatus);
router.get('/student-dashboard/:studentId/course-reports', ctr.renderAttendanceTemplateReports);
router.get('/student-dashboard/:studentId/personal-reports', ctr.renderAttendanceTemplateReports);
router.get('/student-dashboard/:studentId/coaching-reports', ctr.renderAttendanceTemplateReports);


export default router;