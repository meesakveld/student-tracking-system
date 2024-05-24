/**
 * ------------------------------
 *          USER PAGE
 * ------------------------------
 */

import { getStudentById } from "../../services/models/Student.js";
import Student from "../../models/Student.js";


export const userPage = async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const student = await getStudentById(id, '[user.role, labels, class, status_registration.status, trajectory_coach.user, workplace_coach, workplace_mentor]');
        console.log(student);


        // show more recent status value -> status_registration.status.title
        const userInfo = {
            firstName: student.user.firstname,
            lastName: student.user.lastname,
            email: student.user.email,
            class: student.class.name,
            status: student.status_registration[0]?.status.title || "-",
            role: student.user.role.title || "-",
            coach: student.trajectory_coach?.users || "-",
            workCoach: student.workplace_coach?.employees || "-",
            workMentor: student.workplace_mentor?.employees || "-",
            labels: student.labels.map(label => label.title) || null,
        };

        const data = {
            user: req.user,
            userInfo,
            returnUrl: "/"
        };

        res.render('user', data);

    } catch (error) {
        const errorObj = {
            user: req.user,
            error: {
                message: error.message,
                code: 500
            }
        }
        res.status(500).render('error', errorObj);
    }
};

export default userPage;
