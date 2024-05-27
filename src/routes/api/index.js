/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import classRoutes from "./classRoutes.js";
import educationProgrammeRoutes from "./educationProgrammeRoutes.js";
import courseRoutes from "./courseRoutes.js";

// Middleware
import { checkUserToken } from "../../controllers/api/AuthController.js";

/**
 * ------------------------------
 *        CONFIGURATION
 * ------------------------------
*/

const router = Express.Router();


/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
*/

// —— Public routes | Auth routes ——
router.use('/auth', authRoutes)
router.use('/education-programmes', educationProgrammeRoutes)
router.use('/class', classRoutes)
router.use('/course', courseRoutes)


// —— Private routes ——
router.use('/user', checkUserToken, userRoutes)


export default router;