/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import educationProgramme from "./educationProgrammeRoutes.js";

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
router.use('/education-programmes', educationProgramme)

// —— Private routes ——
router.use('/user', checkUserToken, userRoutes)


export default router;