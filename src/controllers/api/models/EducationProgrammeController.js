import EducationProgramme from "../../../models/EducationProgramme.js";
import Employee from "../../../models/Employee.js";

import { employeeFunctionAuth } from "../../../utils/employeeFunctionAuth.js";

export const getAllEducationProgrammes = async (req, res) => {

    let hasFullAccess = true;
    if (req.query.employee_id) {
        const employee = await Employee.query().findById(req.query.employee_id).withGraphFetched('functions');
        hasFullAccess = employeeFunctionAuth(employee.functions, ["admin"]);
    }

    if (!req.query.academic_year) {
        return res.status(400).json({ errors: [{ msg: "Geen academisch jaar opgegeven" }] });
    }

    const education_programmes = await EducationProgramme.query()
        .joinRelated(!hasFullAccess && 'courses.employees')
        .where(builder => {
            if (!hasFullAccess && req.query.employee_id) {
                builder.where('courses:employees.id', req.query.employee_id)
            }
        })
        .where('academic_year', req.query.academic_year)

    if (!education_programmes || education_programmes.length === 0) {
        return res.status(404).json({ errors: [{ msg: "Geen opleidingen gevonden" }] });
    }
    
    res.json(education_programmes);

};