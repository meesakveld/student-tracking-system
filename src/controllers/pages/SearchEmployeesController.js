/**
 * ------------------------------
 *        TEACHERS PAGE
 * ------------------------------
*/

import { employeeFunctionAuth } from "../../utils/employeeFunctionAuth.js";
import EducationProgramme from "../../models/EducationProgramme.js";
import Course from "../../models/Course.js";
import Employee from "../../models/Employee.js";
import Function from "../../models/Function.js";

export const searchEmployeesPage = async (req, res) => {

    const hasFullAccess = employeeFunctionAuth(req.user.employee.functions, ["admin"]);

    // ——— FILTERS DATA ———
    const filterFunction = req.query.filterFunction;
    const filterAcademicYear = req.query.filterAcademicYear;
    const filterProgramme = req.query.filterProgramme;
    const filterCourse = req.query.filterCourse;

    // ——— FILTERS OPTIONS ———
    // ** Function **
    const functionQuery = await Function.query()
    const functionOptions = functionQuery.map(item => ({ value: item.id, label: item.title, selected: item.id === parseInt(filterFunction)}))

    // ** Academic years **
    const academicYearsQuery = await EducationProgramme.query()
        .joinRelated(!hasFullAccess && 'courses.employees')
        .where(builder => {
            if (!hasFullAccess) {
                builder.where('courses:employees.id', req.user.employee.id)
            }
        })
        .distinct('academic_year')
        .select('academic_year');
    const academicYears = academicYearsQuery.map(academicYear => academicYear.academic_year);
    const academicYearsOptions = academicYears.map(academicYear => ({ value: academicYear, label: academicYear, selected: academicYear === filterAcademicYear }));

    // ** Education Programme **
    const educationProgrammesQuery = !filterAcademicYear ? [] : await EducationProgramme.query()
        .joinRelated(!hasFullAccess && 'courses.employees')
        .where(builder => {
            if (!hasFullAccess) {
                builder.where('courses:employees.id', req.user.employee.id)
            }
        })
        .where(builder => {
            if (filterAcademicYear) {
                builder.where('academic_year', filterAcademicYear);
            }
        })
    const educationProgrammesOptions = educationProgrammesQuery.map(programme => ({ value: programme.code, label: `${programme.title} - ${programme.code}`, selected: programme.code === filterProgramme, data: [{ title: "id", value: programme.id }] }));

    // ** Courses **
    const courseQuery = !filterProgramme ? [] : await Course.query()
        .joinRelated(!hasFullAccess && 'employees')
        .where(builder => {
            if (!hasFullAccess) {
                builder.where('employees.id', req.user.employee.id)
            }
        })
        .joinRelated('education_programme')
        .where(builder => {
            if (filterProgramme) {
                builder.where('education_programme.code', filterProgramme);
            }
        });
    const courseOptions = courseQuery.map(course => ({ value: course.id, label: course.name, selected: course.id === parseInt(filterCourse) }));

    const userFilters = [
        {
            id: "filterFunction",
            name: "filterFunction",
            labelText: "Filter op functie:",
            options: [
                { value: "", label: "Selecteer functie" },
                ...functionOptions
            ]
        },
        {
            id: "filterAcademicYear",
            name: "filterAcademicYear",
            labelText: "Filter op academisch jaar:",
            options: [
                { value: "", label: "Selecteer academisch jaar" },
                ...academicYearsOptions
            ]
        },
        {
            id: "filterProgram",
            name: "filterProgramme",
            labelText: "Kies een opleiding:",
            options: [
                { value: "", label: "Alle opleidingen" },
                ...educationProgrammesOptions
            ],
            disabled: !filterAcademicYear,
            data: [
                { title: "employee-id", value: req.user.employee.id }
            ]
        },
        {
            id: "filterCourse",
            name: "filterCourse",
            labelText: "Kies een vak:",
            options: [
                { value: "", label: "Alle vakken" },
                ...courseOptions
            ],
            disabled: !filterProgramme || !courseOptions.length > 0,
        }
    ]


    // ——— TABLE DATA ———
    let employees = [];

    employees = await Employee.query()
        .withGraphFetched('[user.role, education_programmes, courses, functions]')
        .joinRelated(filterFunction && '[functions]')
        .where(builder => {
            if (filterFunction) {
                builder.where('functions.id', filterFunction)
            }
        })
        .joinRelated(filterAcademicYear && '[education_programmes]')
        .where(builder => {
            if (filterAcademicYear) {
                builder.where('education_programmes.academic_year', filterAcademicYear)
            }
        })
        .joinRelated(filterProgramme && '[education_programmes]')
        .where(builder => {
            if (filterProgramme) {
                builder.where('education_programmes.code', filterProgramme);
            }
        })
        .joinRelated(filterCourse && 'courses')
        .where(builder => {
            if (filterCourse) {
                builder.where('courses.id', filterCourse);
            }
        });

    const rows = employees.map(employee => {
        return {
            isActive: employee.user.is_active,
            cols: [
                `${employee.user.firstname} ${employee.user.lastname}`,
                employee.functions.map(item => item.title).join(', '),
                employee.education_programmes.map(item => item.title).join(', ')
            ],
            userId: employee.user.id,
            returnUrl: '/search-employees',
            infoButton: true
        }
    })

    const teachersTable = {
        headers: ["Naam", "Rollen", "Opleidingen"],
        rows: rows,
    }

    const data = {
        user: req.user,
        teachersTable,
        userFilters
    };

    res.render('search-employees', data);
};