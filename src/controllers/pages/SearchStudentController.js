/**
 * ------------------------------
 *      SEARCH STUDENT PAGE
 * ------------------------------
*/

import { employeeFunctionAuth } from "../../utils/employeeFunctionAuth.js";
import EducationProgramme from "../../models/EducationProgramme.js";
import Class from "../../models/Class.js";
import Course from "../../models/Course.js";
import Student from "../../models/Student.js";

/**
 * Controller function for the search student page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the rendering is complete.
 */
export const searchStudentPage = async (req, res) => {

    const hasFullAccess = employeeFunctionAuth(req.user.employee.functions, ["admin"]);

    // ——— FILTERS DATA ———
    const filterAcademicYear = req.query.filterAcademicYear;
    const filterProgramme = req.query.filterProgramme;
    const filterClass = req.query.filterClass;
    const filterCourse = req.query.filterCourse;

    // ——— FILTERS OPTIONS ———
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
    const educationProgrammesOptions = educationProgrammesQuery.map(programme => ({ value: programme.code, label: `${programme.title} - ${programme.code}`, selected: programme.code === filterProgramme, data: [{ title: "id", value: programme.id }]}));

    // ** Classes **
    const classQuery = !filterProgramme ? [] : await Class.query()
        .joinRelated('education_programmes')
        .where(builder => {
            if (filterProgramme) {
                builder.where('education_programmes.code', filterProgramme);
            }
        });
    const classOptions = classQuery.map(classItem => ({ value: classItem.name, label: classItem.name, selected: classItem.name === filterClass }));

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
                { title: "employee-id", value: req.user.employee.id}
            ]
        },
        {
            id: "filterClass",
            name: "filterClass",
            labelText: "Kies een klas:",
            options: [
                { value: "", label: "Alle klassen"},
                ...classOptions
            ],
            disabled: !filterProgramme || !classOptions.length > 0,
            data: [
                { title: "employee-id", value: req.user.employee.id}
            ]
        },
        {
            id: "filterCourse",
            name: "filterCourse",
            labelText: "Kies een vak:",
            options: [
                { value: "", label: "Alle vakken"},
                ...courseOptions
            ],
            disabled: !filterProgramme || !courseOptions.length > 0,
        }
    ];

    // ——— TABLE DATA ———
    let students = [];

    students = await Student.query()
        .withGraphFetched('[user.role, education_programmes, class, courses]')
        .joinRelated(filterProgramme && '[education_programmes]')
        .where(builder => {
            if (filterProgramme) {
                builder.where('education_programmes.code', filterProgramme);
            }
        })
        .joinRelated(filterClass && 'class')
        .where(builder => {
            if (filterClass) {
                builder.where('class.name', filterClass);
            }
        })
        .joinRelated(filterCourse && 'courses')
        .where(builder => {
            if (filterCourse) {
                builder.where('courses.id', filterCourse);
            }
        });

    const rows = students.map(student => {
        return {
            isActive: student.user.is_active,
            cols: [
                `${student.user.firstname} ${student.user.lastname}`,
                student.education_programmes.map(programme => `${programme.title} - ${programme.code}`).join(", ") || "-", 
                student.user.is_active ? "Actief" : "Inactief"],
            returnUrl: '/search-students',
            studentId: student.id,
            userId: student.user.id,
            infoButton: true,
            studentButton: true,
        }
    });

    const usersTable = {
        headers: ["Naam", "Opleiding", "Status"],
        rows: rows,
    }

    const data = {
        user: req.user,
        userFilters,
        usersTable,
    };

    res.render('search-student', data);
};