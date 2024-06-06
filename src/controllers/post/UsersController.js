import User from "../../models/User.js";
import { generatePasswordJWT } from "../../utils/generatePasswordJWT.js";

export const createUserStudent = async (req, res, next) => {

    if (req.pageError) {
        return next();
    }

    try {
    
        const data = req.data;

        const passwordJWT = generatePasswordJWT(data);

        console.log(data)

        let user = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role_id: data.role_id,
            password: passwordJWT.passwordJWTtoken,
            student: {}
        };

        if (data.contact && (data.contact.website !== "" || data.contact.linkedin !== "" || data.contact.facebook !== "")) {
            user.contact = data.contact;
        }

        if (data.labels && data.labels.length > 0) {
            user.student.labels = data.labels;
        }

        if (data.education_programmes && data.education_programmes.length > 0) {
            user.student.education_programmes = data.education_programmes;
        }

        if (data.courses && data.courses.length > 0) {
            user.student.courses = data.courses;
        }

        const newUser = await User.query().insertGraph(user, { relate: true });

        return res.redirect(`/users/${newUser.id}?token=${passwordJWT.token}`);

    } catch (error) {
        console.error(error);
        req.pageError = error.message;
        next();
    }

}

export const updateUser = async (req, res, next) => {

}

export const softDeleteUser = async (req, res, next) => {

}

export const handleUser = async (req, res, next) => {
    const method = req.body.method;
    
    if (method === "POST-STUDENT") {
        createUserStudent(req, res, next);
    }

    if (method === "PATCH") {
        updateUser(req, res, next);
    }

    if (method === "SOFT-DELETE") {
        softDeleteUser(req, res, next);
    }

}