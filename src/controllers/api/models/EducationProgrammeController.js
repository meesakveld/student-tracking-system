import EducationProgramme from "../../../models/EducationProgramme.js";
import Employee from "../../../models/Employee.js";

import { employeeFunctionAuth } from "../../../utils/employeeFunctionAuth.js";

export const getAllEducationProgrammes = async (req, res) => {

    try {
        let hasFullAccess = true;
        if (req.query.employee_id) {
            const employee = await Employee.query().findById(req.query.employee_id).withGraphFetched('functions');
            hasFullAccess = employeeFunctionAuth(employee.functions, ["admin"]);
        }

        if (!req.query.academic_year && !req.query.id) {
            if (!req.query.academic_year && !req.query.id) {
                return res.status(400).json({ errors: [{ msg: "Geen academisch jaar of id opgegeven" }] });
            }
        }

        const education_programmes = await EducationProgramme.query()
            .withGraphFetched(req.query.withRelation ? req.query.withRelation : '')
            .joinRelated(!hasFullAccess && 'employees')
            .where(builder => {
                if (!hasFullAccess && req.query.employee_id) {
                    builder.where('employees.id', req.query.employee_id)
                }
            })
            .where(builder => {
                if (req.query.academic_year) {
                    builder.where('academic_year', req.query.academic_year)
                }
                if (req.query.id) {
                    builder.where('id', req.query.id)
                }
            })

        if (!education_programmes || education_programmes.length === 0) {
            return res.status(404).json({ errors: [{ msg: "Geen opleidingen gevonden" }] });
        }

        res.json(education_programmes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: `Er is iets misgegaan. Error: ${error.message}` }] });
    }

};