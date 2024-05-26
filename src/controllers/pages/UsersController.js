/**
 * ------------------------------
 *          USERS PAGE
 * ------------------------------
*/

import Student from "../../models/Student.js";
import Employee from "../../models/Employee.js";
import EducationProgramme from "../../models/EducationProgramme.js";

export const usersPage = async (req, res) => {

    
    const filterRole = req.query.filterRole;
    const filterProgram = req.query.filterProgram;
    const filterStatus = req.query.filterStatus === "active" ? true : req.query.filterStatus === "inactive" ? false : null;
    const filterAcademicYear = req.query.filterAcademicYear;

    const academicYearsQuery = await EducationProgramme.query().distinct('academic_year').select('academic_year');
    const academicYears = academicYearsQuery.map(academicYear => academicYear.academic_year);
    const academicYearsOptions = academicYears.map(academicYear => ({ value: academicYear, label: academicYear, selected: academicYear === filterAcademicYear}));

    const programmes = !filterAcademicYear ? [] : await EducationProgramme.query()
        .where(builder => {
            if (filterAcademicYear) {
                builder.where('academic_year', filterAcademicYear);
            }
        });
    const programmesOptions = programmes.map(programme => ({ value: programme.code, label: `${programme.title} - ${programme.code}`, selected: programme.code === filterProgram }));

    // ——— FILTERS ———
    const userFilters = [
        {
            id: "filter1",
            name: "filterRole",
            labelText: "Filter op rol:",
            options: [
                { value: "", label: "Alle rollen" },
                { value: "student", label: "Student", selected: filterRole === "student" },
                { value: "employee", label: "Medewerker", selected: filterRole === "employee" },
                { value: "external", label: "Extern", selected: filterRole === "external" }
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
            name: "filterProgram",
            labelText: "Filter op opleiding:",
            options: [
                { value: "", label: "Alle opleidingen" },
                ...programmesOptions
            ],
            disabled: !filterAcademicYear
        },
        {
            id: "filter4",
            name: "filterStatus",
            labelText: "Filter op status:",
            options: [
                { value: "", label: "Alle statussen" },
                { value: "active", label: "Actief", selected: filterStatus === true },
                { value: "inactive", label: "Inactief", selected: filterStatus === false }
            ]
        }
    ];

    // ——— TABLE DATA ———
    let students = [];
    let employees = [];

    students = await Student.query()
        .withGraphFetched('[user.role, education_programmes]')
        .joinRelated('user')
        .where(builder => {
            if (filterStatus !== null) {
                builder.where('user.is_active', filterStatus);
            }
        })
        .joinRelated(filterProgram || filterAcademicYear ? 'education_programmes' : '')
        .where(builder => {
            if (filterAcademicYear) {
                builder.where('education_programmes.academic_year', filterAcademicYear);
            }
        })
        .where(builder => {
            if (filterProgram) {
                builder.where('education_programmes.code', filterProgram);
            }
        })

    employees = await Employee.query()
        .withGraphFetched('[user.role, education_programmes]')
        .joinRelated('user')
        .where(builder => {
            if (filterStatus !== null) {
                builder.where('user.is_active', filterStatus);
            }
        })
        .joinRelated(filterProgram || filterAcademicYear ? 'education_programmes' : '')
        .where(builder => {
            if (filterAcademicYear) {
                builder.where('education_programmes.academic_year', filterAcademicYear);
            }
        })
        .where(builder => {
            if (filterProgram) {
                builder.where('education_programmes.code', filterProgram);
            }
        })

    if (filterRole === "student") employees = [];
    if (filterRole === "employee") students = [];

    let users = [...students, ...employees];
    users.sort((a, b) => a.user.lastname < b.user.lastname ? -1 : 1);

    const rows = users.map(user => {
        const isActive = user.user.is_active;
        return {
            isActive,
            cols: [
                `${user.user.firstname} ${user.user.lastname}`,
                user.user.role.title,
                user.education_programmes.map(programme => `${programme.title} - ${programme.code}`).join(", ") || "-",
                isActive ? "Actief" : "Inactief"
            ],
            user_id: user.user_id,
            deleteButton: true,
            infoButton: true
        };
    })

    const usersTable = {
        headers: ["Naam", "Rol", "Opleiding", "Status"],
        rows: rows
    };


    // ——— RENDER DATA ———
    const data = {
        user: req.user,
        userFilters,
        usersTable
    };

    res.render("users", data);
};

export default usersPage;