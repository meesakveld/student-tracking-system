/**
 * ------------------------------
 *    EDUCATION PROGRAMMES PAGE
 * ------------------------------
*/

import { employeeFunctionAuth } from "../../utils/employeeFunctionAuth.js";
import EducationProgramme from "../../models/EducationProgramme.js";

export const educationProgrammesPage = async (req, res) => {

    try {
        const hasFullAccess = employeeFunctionAuth(req.user.employee.functions, ["admin"]);

        // ——— FILTERS DATA ———
        const filterAcademicYear = req.query.filterAcademicYear;

        // ——— FILTERS OPTIONS ———
        // ** Academic years **
        const academicYearsQuery = await EducationProgramme.query()
            .joinRelated(!hasFullAccess && 'employees')
            .where(builder => {
                if (!hasFullAccess) {
                    builder.where('employees.id', req.user.employee.id)
                }
            })
            .distinct('academic_year')
            .select('academic_year');
        const academicYears = academicYearsQuery.map(academicYear => academicYear.academic_year);
        const academicYearsOptions = academicYears.map(academicYear => ({ value: academicYear, label: academicYear, selected: academicYear === filterAcademicYear }));

        const educationProgrammesFilters = [
            {
                id: "filterAcademicYear",
                name: "filterAcademicYear",
                labelText: "Filter op academisch jaar:",
                options: [
                    { value: "", label: "Selecteer academisch jaar" },
                    ...academicYearsOptions
                ]
            },
        ]

        // ——— TABLE DATA ———
        let educationProgrammes = [];

        educationProgrammes = await EducationProgramme.query()
            .joinRelated(!hasFullAccess && 'employees')
            .where(builder => {
                if (!hasFullAccess) {
                    builder.where('employees.id', req.user.employee.id)
                }
            })
            .where(builder => {
                if (filterAcademicYear) {
                    builder.where('academic_year', filterAcademicYear);
                }
            });

        const rows = educationProgrammes.map(programme => {
            return {
                isActive: true,
                cols: [
                    programme.title,
                    programme.code,
                    programme.academic_year,
                ],
                infoButton: {
                    info: true,
                    url: `/education-programmes/${programme.id}`
                }
            }
        });

        const educationProgrammesTable = {
            headers: ["Naam", "Opleidingscode", "Academisch jaar"],
            rows: rows,
        }

        // ——— RENDER DATA ———
        const data = {
            user: req.user,
            educationProgrammesFilters,
            educationProgrammesTable
        };
        res.render("education-programmes", data);

    } catch (error) {
        console.log(error);
        const data = {
            user: req.user,
            error: {
                message: error.message,
                code: 500,
            },
        };
        res.status(data.error.code).render("error", data);
    }
}