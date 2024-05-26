/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Models
import EducationProgramme from "../../models/EducationProgramme.js";

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
router.get('/', async (req, res) => {
    
    if (!req.query.academic_year) {
        return res.status(400).json({ errors: [{ msg: "Geen academisch jaar opgegeven" }] });
    }

    const education_programmes = await EducationProgramme.query()
        .where('academic_year', req.query.academic_year)

    if (!education_programmes || education_programmes.length === 0) {
        return res.status(404).json({ errors: [{ msg: "Geen opleidingen gevonden" }] });
    }
    
    res.json(education_programmes);
});

export default router;