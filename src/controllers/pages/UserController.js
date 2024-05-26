/**
 * ------------------------------
 *          USER PAGE
 * ------------------------------
 */


import { getUserById } from "../../services/models/User.js";

export const userPage = async (req, res) => {

    try {

        const id = parseInt(req.params.id);
        const user = await getUserById(id, '[role, student.[labels, class, status_registration.status, trajectory_coach.user, workplace_coach, workplace_mentor], employee]');

        let userData = user;
        if (user.student) userData.account = user.student; delete userData.student
        if (user.employee) userData.account = user.employee; delete userData.employee 

        const userInfo = {
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            class: userData.role === "student" ? "-" : userData.account?.class?.name,
            status: userData.account?.status_registration?.[0]?.status.title || "-",
            role: userData.role.title || "-",
            coach: userData.account?.trajectory_coach?.users || "-",
            workCoach: userData.account?.workplace_coach?.employees || "-",
            workMentor: userData.account?.workplace_mentor?.employees || "-",
            labels: userData.account?.labels?.map(label => label.title) || null,
        };

        const data = {
            user: req.user,
            userInfo,
            returnUrl: "/users"
        };

        res.render('user', data);

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
