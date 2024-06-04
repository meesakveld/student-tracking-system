/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/

import AttendanceType from "../../models/AttendanceType.js";
import Course from "../../models/Course.js";
import Deregister from "../../models/Deregister.js";
import Status from "../../models/Status.js";
import StatusRegistration from "../../models/StatusesRegistration.js";
import { getStudentById } from "../../services/models/Student.js";

export const statusStudentPage = async (req, res) => {

    try {
        const studentId = req.params.studentId;
        const student = await getStudentById(studentId, '[user]');

        const filterCourse = req.query.filterCourse;
        const filterAttendanceType = req.query.filterAttendanceType;

        // // ** Courses **
        // const courseQuery = await Course.query()
        //     .joinRelated('students')
        //     .where('students.id', parseInt(studentId))
        // const courseOptions = courseQuery.map(course => {
        //     return {
        //         value: course.id,
        //         label: course.name,
        //         selected: course.id === parseInt(filterCourse)
        //     }
        // });

        // // ** Attendance Types **
        // const attendanceTypesQuery = await AttendanceType.query()
        // const attendanceOptions = attendanceTypesQuery.map(attendanceType => {
        //     return {
        //         value: attendanceType.id,
        //         label: attendanceType.title,
        //         selected: attendanceType.id === parseInt(filterAttendanceType)
        //     }
        // });

        // const userFilters = [
        //     {
        //         id: "filterCourse",
        //         name: "filterCourse",
        //         labelText: "Filter op vak:",
        //         options: [
        //             { value: "", label: "Alle vakken" },
        //             ...courseOptions
        //         ]
        //     },
        //     {
        //         id: "filterAttendanceType",
        //         name: "filterAttendanceType",
        //         labelText: "Filter op aanwezigheid type:",
        //         options: [
        //             { value: "", label: "Alle aanwezigheid types" },
        //             ...attendanceOptions
        //         ]
        //     }
        // ]

        // ——— TABLE DATA ———
        let statuses = [];
        let deregister = [];

        statuses = await StatusRegistration.query()
            .withGraphFetched('[status]')
            .where('student_id', studentId)
            .joinRelated('status')
            .orderBy('date', 'desc');

        deregister = await Deregister.query()
            .withGraphFetched('[student]')
            .where('student_id', studentId)
            .joinRelated('student')

        const rows = statuses.map(status => {
            return {
                isActive: true,
                cols: [
                    status.date,
                    status.status.title,
                    deregister.reason
                ],
            }
        });

        const statusTable = {
            headers: ["Datum", "Status type", "Comment"],
            rows: rows,
        }

        const data = {
            user: req.user,
            usersTable: statusTable,
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