/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import { getAllEducationProgrammes } from "../../controllers/api/models/EducationProgrammeController.js";

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

// API Todos routes
router.get('/', getAllEducationProgrammes);

export default router;