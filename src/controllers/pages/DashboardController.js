/**
 * ------------------------------
 *        DASHBOARD PAGE
 * ------------------------------
*/

import fsp from 'fs/promises';
import path from 'path';
import { employeeFunctionAuth } from '../../utils/employeeFunctionAuth.js'
import { NODE_ENV } from '../../consts.js';

export const dashboardPage = async (req, res) => {

    const __dirname = path.resolve();
    const filePath = path.join(__dirname, (NODE_ENV === 'production' ? '' : 'public'), 'data', 'dashboard.json');
    const dashboardData = await fsp.readFile(filePath, "utf-8").then(data => JSON.parse(data));
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