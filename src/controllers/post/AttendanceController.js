import Attendance from '../../models/Attendance.js';
import { validationResult } from 'express-validator';

// Develop Post request with validation → Possible after POST request are set in the routing

export const createAttendance = async (req, res, next) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Process the POST request
    try {
        // Your code to create the attendance record goes here

        // Return success response
        return res.status(201).json({ message: 'Attendance created successfully' });
    } catch (error) {
        // Handle any errors that occur during processing
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateAttendance = async (req, res, next) => {
    const attendanceId = req.body.id;
    const attendance = await Attendance.query().patchAndFetchById(attendanceId, {
        attendances_type_id: req.body.todo,
    });
    res.redirect("/");
    
}

export const deleteAttendance = async (req, res, next) => {

}

export const handleAttendance = async (req, res, next) => {
    const method = req.body.method;

    if (method === "POST") {
        createAttendance(req, res, next);
    }

    if (method === "PATCH") {
        updateAttendance(req, res, next);
    }

    if (method === "DELETE") {
        deleteAttendance(req, res, next);
    }

}