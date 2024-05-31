/**
 * ------------------------------
 *       EDIT USER PAGE
 * ------------------------------
 */

import { getUserById } from "../../services/models/User.js"

export const editUserPage = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const returnUrl = req.query.returnUrl || "/";
        const user = await getUserById(id, '[role, student.[labels, class, status_registration.status, trajectory_coach.user, workplace_coach.user, workplace_mentor.user], employee]');
        
        let userData = user;
        if (user.student) userData.account = user.student; delete userData.student;
        if (user.employee) userData.account = user.employee; delete userData.employee;

        const userInfo = {
            id: userData.id,
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            class: userData.account?.class?.name || (user.role.title === "student" ? "-" : null),
            status: userData.account?.status_registration?.[0]?.status.title || (user.role.title === "student" ? "-" : null),
            role: userData.role.title,
            coaches: userData.account?.trajectory_coach?.map(coach => coach.user) || (user.role.title === "student" ? [] : null),
            workCoaches: userData.account?.workplace_coach?.map(coach => coach.user) || (user.role.title === "student" ? [] : null),
            workMentor: userData.account?.workplace_mentor?.user || (user.role.title === "student" ? "-" : null),
            labels: userData.account?.labels?.map(label => label.title) || [],
        };

        const pageTitle = `Edit Informatie over: ${userInfo.firstName} ${userInfo.lastName}`;

        const data = {
            user: req.user,
            userInfo,
            pageTitle,
            returnUrl: returnUrl,
            viewOnly: false
        };

        if (data.user.employee && data.user.employee.functions) {
            data.user.employee.functions = data.user.employee.functions.map(func => func.title);
        }

        res.render('edit-user', data);

    } catch (error) {
        const data = {
            user: req.user,
            error: {
                message: error.message,
                code: 500
            }
        }
        res.status(500).render('error', data);
    }
};
