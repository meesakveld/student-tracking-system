/**
 * ------------------------------
 *        DASHBOARD PAGE
 * ------------------------------
*/

import { employeeFunctionAuth } from '../../utils/employeeFunctionAuth.js'
import dashboardData from '../../data/dashboard.js'

export const dashboardPage = async (req, res) => {

    try {

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
};