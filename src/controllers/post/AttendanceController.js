import Attendance from '../../models/Attendance.js';
import { validationResult } from 'express-validator';

export const createAttendances = async (req, res, next) => {

    // Create an array of attendances ↓
    let attendances = []
    for (let i = 1; i <= req.body.totalStudents; i++) {
        attendances.push({
            student_id: parseInt(req.body[`name-${i}`]),
            attendance_type_id: parseInt(req.body[`attendance-${i}`]),
            course_id: parseInt(req.body.courseId),
            date: req.body.date
        })
    }

    // Add attendances to the database ↓
    try {
        await Attendance.query().insert(attendances)
    } catch (error) {
        return console.log('error', error)
    }

    // Redirect to the previous page ↓
    return res.redirect(req.headers.referer)

}

export const createAttendance = async (req, res, next) => {



}

export const deleteAttendance = async (req, res, next) => {

}

export const handleAttendance = async (req, res, next) => {

    if (req.body.method === "POST-MULTI") {
        createAttendances(req, res, next);
    }

    if (req.body.method === "POST") {
        createAttendance(req, res, next);
    }

    if (req.body.method === "DELETE") {
        deleteAttendance(req, res, next);
    }

}