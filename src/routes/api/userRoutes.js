/**
 * ------------------------------
 *            IMPORTS
 * ------------------------------
*/

import Express from "express";

// Controllers
import { getAllUsers, getUserById } from "../../services/models/User.js";


// Middleware


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
    const users = await getUserById(5 ,'[role]');

    res.json(users);
});

export default router;