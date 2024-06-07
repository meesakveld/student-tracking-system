import User from "../../models/User.js";
import { generatePasswordJWT } from "../../utils/generatePasswordJWT.js";

export const createUserStudent = async (req, res, next) => {

    if (req.pageError) {
        return next();
    }

    try {

        const data = req.data;
        const passwordJWT = generatePasswordJWT(data);

        let user = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role_id: data.role_id,
            password: passwordJWT.passwordBcrypt,
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

export const createUserEmployee = async (req, res, next) => {
    
    if (req.pageError) {
        return next();
    }

    try {

        const data = req.data;
        const passwordJWT = generatePasswordJWT(data);

        let user = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role_id: data.role_id,
            password: passwordJWT.passwordBcrypt,
            employee: {}
        };

        if (data.contact && (data.contact.website !== "" || data.contact.linkedin !== "" || data.contact.facebook !== "")) {
            user.contact = data.contact;
        }

        if (data.functions && data.functions.length > 0) {
            user.employee.functions = data.functions;
        }

        if (data.education_programmes && data.education_programmes.length > 0) {
            user.employee.education_programmes = data.education_programmes;
        }

        if (data.courses && data.courses.length > 0) {
            user.employee.courses = data.courses;
        }

        const newUser = await User.query().insertGraph(user, { relate: true });

        return res.redirect(`/users/${newUser.id}?token=${passwordJWT.token}`);

    } catch (error) {
        console.error(error);
        req.pageError = error.message;
        next();
    }

}

export const updateUserStudent = async (req, res, next) => {

    if (req.pageError) {
        return next();
    }

    try {

        const data = req.data;
        const id = parseInt(req.params.id);
        
        const user = {
            id: id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role_id: data.role_id,
            student: {}
        };

        if (data.is_active) {
            user.is_active = data.is_active;
        }

        if (data.contact && (data.contact.website !== "" || data.contact.linkedin !== "" || data.contact.facebook !== "")) {
            user.contact = data.contact
        }

        if (data.student_id) {
            user.student.id = data.student_id;
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

        const updatedUser = await User.query().upsertGraph(user, { relate: true, unrelate: true });

        return res.redirect(`/users/${updatedUser.id}`);

    } catch (error) {
        console.error(error);
        req.pageError = error.message;
        next();
    }

}

export const updateUserEmployee = async (req, res, next) => {

    if (req.pageError) {
        return next();
    }

    try {

        const data = req.data;
        const id = parseInt(req.params.id);

        const user = {
            id: id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            role_id: data.role_id,
            is_active: data.is_active === 1 ? true : false,
            employee: {}
        };

        if (data.contact && (data.contact.website !== "" || data.contact.linkedin !== "" || data.contact.facebook !== "")) {
            user.contact = data.contact
        }

        if (data.employee_id) {
            user.employee.id = data.employee_id;
        }

        if (data.functions && data.functions.length > 0) {
            user.employee.functions = data.functions;
        }

        if (data.education_programmes && data.education_programmes.length > 0) {
            user.employee.education_programmes = data.education_programmes;
        }

        if (data.courses && data.courses.length > 0) {
            user.employee.courses = data.courses;
        }

        console.log(user)

        const updatedUser = await User.query().upsertGraph(user, { relate: true, unrelate: true });

        return res.redirect(`/users/${updatedUser.id}`);

    } catch (error) {
        console.error(error);
        req.pageError = error.message;
        next();
    }

}

export const softDeleteUser = async (req, res, next) => {

}

export const handleUser = async (req, res, next) => {
    const method = req.body.method;

    if (method === "POST-STUDENT") {
        createUserStudent(req, res, next);
    }

    if (method === "POST-EMPLOYEE") {
        createUserEmployee(req, res, next);
    }

    if (method === "PATCH-STUDENT") {
        updateUserStudent(req, res, next);
    }

    if (method === "PATCH-EMPLOYEE") {
        updateUserEmployee(req, res, next);
    }

    if (method === "SOFT-DELETE") {
        softDeleteUser(req, res, next);
    }

}