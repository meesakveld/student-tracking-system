/**
 * ------------------------------
 *        PRESENCES PAGE
 * ------------------------------
*/
import Deregister from "../../models/Deregister.js";
import Status from "../../models/Status.js";
import StatusRegistration from "../../models/StatusesRegistration.js";
import { getStudentById } from "../../services/models/Student.js";

export const statusStudentPage = async (req, res) => {

    try {
        const studentId = req.params.studentId;
        const student = await getStudentById(studentId, '[user]');


        const statusTypeQuery = await Status.query();
        const statusOptions = statusTypeQuery.map(statusType => {
            return {
                value: statusType.id,
                label: statusType.title,
                selected: statusType.id === parseInt(req.query.statusType) || statusType.id === 1
            }
        });

        const statusAddition = {
            id: "statusType",
            name: "statusType",
            labelText: "Status type",
            options: [
                ...statusOptions
            ]
        }

        // ——— TABLE DATA ———
        let statuses = [];

        statuses = await StatusRegistration.query()
            .withGraphFetched('[status, deregister]')
            .where('student_id', studentId)
            .joinRelated('status')
            .orderBy('date', 'desc');

        const rows = statuses.map(status => {
            return {
                isActive: true,
                cols: [
                    status.date,
                    status.status.title,
                    status.deregister.reason
                ],
            }
        });

        const statusTable = {
            headers: ["Datum", "Status type", "Annotatie"],
            rows: rows,
        }

        const addStatusFormData = {
            formAction: `/student-dashboard/${studentId}/status`,
        }

        const data = {
            user: req.user,
            statusAddition,
            usersTable: statusTable,
            pageError: req.pageError,
            flash: req.flash,
            title: `Status van ${student.user.firstname} ${student.user.lastname}`,
            returnUrl: `/student-dashboard/${studentId}`,
        }


        res.render('student-statuses', data);

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