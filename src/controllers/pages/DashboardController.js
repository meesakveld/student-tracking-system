/**
 * ------------------------------
 *        DASHBOARD PAGE
 * ------------------------------
*/

import { employeeFunctionAuth } from '../../utils/employeeFunctionAuth.js'

export const dashboardPage = async (req, res) => {

    const dashboardData = await import('../../data/dashboard.json', { assert: { type: 'json' } }).then(data => data.default);
    const dashboardUserData = dashboardData.map(value => {
        if (!value.roles.includes(req.user.role.title)) return
        if (req.user.employee) {
            if (!employeeFunctionAuth(req.user.employee.functions, value.functions)) return
        }

        if (value.url.includes("{id}")) {
            value.url = value.url.replace("{id}", req.user.id);
        }

        if (value.url.includes("{student_id}")) {
            value.url = value.url.replace("{student_id}", req.user.student.id);
        }

        if (value.url.includes("{employee_id}")) {
            value.url = value.url.replace("{employee_id}", req.user.employee.id);
        }

        return {
            title: value.title,
            url: value.url
        }

    }).filter(value => value !== undefined);

    const data = {
        user: req.user,
        dashboardLinks: dashboardUserData
    };

    res.render("dashboard", data);
};