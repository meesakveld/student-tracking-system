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
router.get('/attendances/:studentId', ctr.renderAttendanceTemplate);

export default router;