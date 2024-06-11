import Attendance from '../../models/Attendance.js';
import { NODE_ENV } from '../../consts.js';

export const createAttendances = async (req, res, next) => {

    try {

        // Create an array of attendances ↓
        let attendances = []
        for (let i = 0; i <= req.body.totalStudents - 1; i++) {
            attendances.push({
                student_id: parseInt(req.body[`name-${i}`]),
                attendance_type_id: parseInt(req.body[`attendance-${i}`]),
                course_id: parseInt(req.body.courseId),
                date: req.body.date
            })
        }

        // Add attendances to the database ↓
        if (NODE_ENV === 'development') {
            attendances.forEach(async (item) => {
                await Attendance.query().insert(item)
            })
        } else {
            await Attendance.query().insert(attendances)
        }

        // Redirect to the previous page ↓
        req.flash = "Gelukt! De aanwezigheden zijn toegevoegd."
        return next()


    } catch (error) {
        // Add error in req ↓
        req.pageError = error.message
        next()
    }

}

export const deleteAttendance = async (req, res, next) => {

    try {

        const attendanceId = parseInt(req.body.attendanceId)

        if (!attendanceId) {
            req.pageError = "Geen ID gevonden"
            return next()
        }

        await Attendance.query().deleteById(attendanceId)
        req.flash = "Gelukt! De aanwezigheid is verwijderd."
        next()
    } catch (error) {
        req.pageError = error.message
        next()
    }

}

export const handleAttendance = async (req, res, next) => {

    if (req.body.method === "POST-MULTI") {
        createAttendances(req, res, next);
    }

    else if (req.body.method === "DELETE") {
        deleteAttendance(req, res, next);
    }

    else {
        req.pageError = "Methode niet gevonden"
        next()
    }

}