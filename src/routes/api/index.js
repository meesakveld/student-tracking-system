/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

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

// —— Private routes ——
router.use(checkUserToken)
router.use('/user', userRoutes)


export default router;