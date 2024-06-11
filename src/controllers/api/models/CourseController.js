import Course from "../../../models/Course.js";
import Employee from "../../../models/Employee.js";

import { employeeFunctionAuth } from "../../../utils/employeeFunctionAuth.js";

export const getAllCourses = async (req, res) => {

    try {

        let hasFullAccess = true;
        let isTeamLeader = false;
        if (req.query.employee_id) {
            const employee = await Employee.query().findById(req.query.employee_id).withGraphFetched('functions');
            hasFullAccess = employeeFunctionAuth(employee.functions, ["admin"]);
            isTeamLeader = employeeFunctionAuth(employee.functions, ["teamleader"]);
        }

        if (!req.query.education_programme_id) {
            return res.json({ errors: [{ msg: "Geen opleiding opgegeven" }] });
        }

        const courses = await Course.query()
            .joinRelated(!hasFullAccess && !isTeamLeader && 'employees')
            .where(builder => {
                if (!hasFullAccess && !isTeamLeader && req.query.employee_id) {
                    builder.where('employees.id', req.query.employee_id);
                }
            })
            .joinRelated(req.query.education_programme_id && 'education_programme')
            .where(builder => {
                if (req.query.education_programme_id) {
                    builder.where('education_programme_id', req.query.education_programme_id);
                }
            })

        if (!courses || courses.length === 0) {
            return res.json({ errors: [{ msg: "Geen cursussen gevonden" }] });
        }

        res.json(courses);

    } catch (error) {
        console.error(error);
        res.json({ errors: [{ msg: "Er is iets fout gegaan", error }] });
    }

}