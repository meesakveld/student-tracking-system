/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/

import Attendance from "../../models/Attendance.js";
import AttendanceType from "../../models/AttendanceType.js";
import Course from "../../models/Course.js";
import { getStudentById } from "../../services/models/Student.js";

export const attendancesStudentPage = async (req, res) => {

    try {
        const studentId = req.params.studentId;
        const student = await getStudentById(studentId, '[user]');

        const filterCourse = req.query.filterCourse;
        const filterAttendanceType = req.query.filterAttendanceType;

        // ** Courses **
        const courseQuery = await Course.query()
            .joinRelated('students')
            .where('students.id', parseInt(studentId))
        const courseOptions = courseQuery.map(course => {
            return {
                value: course.id,
                label: course.name,
                selected: course.id === parseInt(filterCourse)
            }
        });

        // ** Attendance Types **
        const attendanceTypesQuery = await AttendanceType.query()
        const attendanceOptions = attendanceTypesQuery.map(attendanceType => {
            return {
                value: attendanceType.id,
                label: attendanceType.title,
                selected: attendanceType.id === parseInt(filterAttendanceType)
            }
        });

        const userFilters = [
            {
                id: "filterCourse",
                name: "filterCourse",
                labelText: "Filter op vak:",
                options: [
                    { value: "", label: "Alle vakken" },
                    ...courseOptions
                ]
            },
            {
                id: "filterAttendanceType",
                name: "filterAttendanceType",
                labelText: "Filter op aanwezigheid type:",
                options: [
                    { value: "", label: "Alle aanwezigheid types" },
                    ...attendanceOptions
                ]
            }
        ]

        // ——— TABLE DATA ———
        let attendances = [];

        attendances = await Attendance.query()
            .withGraphFetched('[attendance_type, course]')
            .where('student_id', studentId)
            .joinRelated('attendance_type')
            .where(builder => {
                if (filterCourse) {
                    builder.where('course_id', filterCourse);
                }
                if (filterAttendanceType) {
                    builder.where('attendance_type_id', filterAttendanceType);
                }
            });

        const rows = attendances.map(attendance => {
            return {
                isActive: true,
                cols: [
                    attendance.date,
                    attendance.course.name,
                    attendance.attendance_type.title
                ]
            }
        });

        const attendancesTable = {
            headers: ["Datum", "Vak", "Aanwezigheid type"],
            rows: rows,
        }

        const data = {
            user: req.user,
            userFilters,
            usersTable: attendancesTable,
            title: `Aanwezigheden van ${student.user.firstname} ${student.user.lastname}`,
        }


        res.render('student-attendances', data);

    } catch (error) {
        console.log(error);
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

export const addAttendancesPage = async (req, res) => {

    try {

        const attendanceTypes = await AttendanceType.query()
        const attendanceOptions = (attendance_type_id = 1) => {
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
                index: 1,
                attendanceName: `attendance-${1}`,
                attendanceOptions: attendanceOptions()
            },
            {
                name: "Tristan De Ridder",
                studentId: 2,
                index: 2,
                attendanceName: `attendance-${2}`,
                attendanceOptions: attendanceOptions()
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

        res.render('add-attendances', data);

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