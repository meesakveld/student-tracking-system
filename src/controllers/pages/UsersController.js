/**
 * ------------------------------
 *          USERS PAGE
 * ------------------------------
*/

import { getAllStudents } from "../../services/models/Student.js";
import { getAllEmployees } from "../../services/models/Employee.js";
import { getAllEducationProgrammes } from "../../services/models/EducationProgramme.js";
import Student from "../../models/Student.js";
import Employee from "../../models/Employee.js";

export const usersPage = async (req, res) => {

    const filterRole = req.query.filterRole;
    const filterProgram = req.query.filterProgram;
    const filterStatus = req.query.filterStatus === "active" ? true : req.query.filterStatus === "inactive" ? false : null;

    const programmes = await getAllEducationProgrammes();
    const programmesOptions = programmes.map(programme => ({ value: programme.slug, label: `${programme.title} - ${programme.code}` }));

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
            id: "filter3",
            name: "filterProgram",
            labelText: "Filter op opleiding:",
            options: [
                { value: "", label: "Alle opleidingen" },
                ...programmesOptions
            ]
        },
        {
            id: "filter4",
            name: "filterStatus",
            labelText: "Filter op status:",
            options: [
                { value: "", label: "Alle statussen" },
                { value: "active", label: "Actief" },
                { value: "inactive", label: "Inactief" }
            ]
        }
    ];

    // ——— TABLE DATA ———
    let students = [];
    let employees = [];

    // Sla een parameter over als deze niet is ingevuld
    const test = await Student.query()
        .withGraphFetched('[user(filterUser).role, education_programmes(filterProgram)]')
        .modifiers({
            filterUser(builder) {
                if (filterStatus !== null) {
                    builder.where('is_active', filterStatus);
                }
                if (filterRole !== undefined) {
                    builder.join('roles', 'users.role_id', 'roles.id')
                        .where('roles.title', filterRole);
                }
            },
            filterProgram(builder) {
                if (filterProgram !== undefined) {
                    builder.where('slug', filterProgram);
                }
            }
        });

    console.log('test', test);

    students = await getAllStudents('[user.role, education_programmes]');
    employees = await getAllEmployees('[user.role, education_programmes]');

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