/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/

import { getAllAttendence } from "../../services/models/Attendence.js";
import { getAllStudents } from "../../services/models/Student.js";

export const presencesPage = async (req, res) => {

    try {

        const attendance = await getAllAttendence( '[students, course, attendance_type]');
        const students = await getAllStudents('[user]');
        
        let attendanceData = attendance;
        let studentsData = students;

        console.log(attendanceData);
        console.log(studentsData);

        const usersTable = {
            rows: studentsData.map((student, index) => ({
                checkbox: true,
                statusClass: "active",
                cols: [student.user.firstname + " " + student.user.lastname, attendanceData[index].attendance_type.title],
                infoButton: true,
                studentButton: true,
            })),
        };


        const data = {
            user: req.user,
            usersTable,
        };

        res.render('presences', data);

    } catch (error) {
        const data = {
            user: req.user,
            error: {
                message: error.message,
                code: 500
            }
        }
        res.status(500).render('error', data);
    }
};