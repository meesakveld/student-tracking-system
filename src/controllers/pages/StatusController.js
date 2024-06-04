/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/

import Attendance from "../../models/Attendance.js";
import AttendanceType from "../../models/AttendanceType.js";
import Course from "../../models/Course.js";
import { getStudentById } from "../../services/models/Student.js";

export const statusStudentPage = async (req, res) => {

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
            })
            .orderBy('date', 'desc');

        const rows = attendances.map(attendance => {
            return {
                isActive: true,
                cols: [
                    attendance.date,
                    attendance.course.name,
                    attendance.attendance_type.title
                ],
                delete: {
                    delete: req.user.employee ? true : false,
                    actionUrl: "",
                    infoInputs: [
                        `<input type="hidden" name="attendanceId" value="${attendance.id}">`
                    ]
                }
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
            pageError: req.pageError,
            flash: req.flash,
            title: `Aanwezigheden van ${student.user.firstname} ${student.user.lastname}`,
            returnUrl: `/student-dashboard/${studentId}`,
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