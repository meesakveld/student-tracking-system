/**
 * ------------------------------
 *          USER PAGE
 * ------------------------------
 */


import { getUserById } from "../../services/models/User.js";

export const userPage = async (req, res) => {

    try {

        const id = parseInt(req.params.id);
        const returnUrl = req.query.returnUrl || "/";
        const user = await getUserById(id, '[role, student.[labels, class, status_registration.status, trajectory_coach.user, workplace_coach, workplace_mentor], employee]');

        let userData = user;
        if (user.student) userData.account = user.student; delete userData.student
        if (user.employee) userData.account = user.employee; delete userData.employee 

        const userInfo = {
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            class: userData.account?.class?.name || (user.role.title === "student" ? "-" : null),
            status: userData.account?.status_registration?.[0]?.status.title || (user.role.title === "student" ? "-" : null),
            role: userData.role.title,
            coach: userData.account?.trajectory_coach?.users || (user.role.title === "student" ? "-" : null),
            workCoach: userData.account?.workplace_coach?.employees || (user.role.title === "student" ? "-" : null),
            workMentor: userData.account?.workplace_mentor?.employees || (user.role.title === "student" ? "-" : null),
            labels: userData.account?.labels?.map(label => label.title) || null,
            functions: "Teamleider, docent, stagebegeleider",
            courses: "Graduaat Programmeren, Digitale Vormgeving",
            subjects: "Web Animations, Programming 4, IT Communication",
        };
        
        const pageTitle = `Informatie over: ${userInfo.firstName} ${userInfo.lastName}`;
        
        const data = {
            user: req.user,
            userInfo,
            pageTitle,
            returnUrl: returnUrl,
            website: "https://www.artevelde.be",
            linkedIn: "https://www.linkedin.com",
            facebook: "https://www.facebook.com",
        };

        if (data.user.employee && data.user.employee.functions) {
            data.user.employee.functions = data.user.employee.functions.map(func => func.title);
        }

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
