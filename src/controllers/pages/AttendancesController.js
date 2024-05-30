/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/

import AttendanceType from "../../models/AttendanceType.js";

export const addAttendancesPage = async (req, res) => {

    try {

        const attendanceTypes = await AttendanceType.query()
        const attendanceOptions = (attendance_type_id) => {
            return attendanceTypes.map(item => {
                return {
                    value: item.id,
                    label: item.title,
                    selected: item.id === attendance_type_id
                }
            })
        }

        const rows = [
            {
                name: "Mees Akveld",
                studentId: 1,
                attendanceName: `attendance-${1}`,
                attendanceOptions: attendanceOptions(1)
            },
            {
                name: "Tristan De Ridder",
                studentId: 2,
                attendanceName: `attendance-${2}`,
                attendanceOptions: attendanceOptions(2)
            },
        ]

        const data = {
            user: req.user,
            pageError: req.pageError,
            rows,
            courseId: 1,
            date: new Date(),
            totalStudents: rows.length
        };

        res.render('attendances', data);

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