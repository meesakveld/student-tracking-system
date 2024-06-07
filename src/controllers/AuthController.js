import { TOKEN_SALT } from "../consts.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

/**
 * ------------------------------
 *            LOGIN
 * ------------------------------
*/
export const login = async (req, res, next) => {

    // check if user is already logged in
    if (req.user) {
        return res.redirect("/");
    }

    // get form inputs
    const inputs = [
        {
            name: "email",
            label: "Email",
            type: "email",
            value: req.body.email,
            err: req.formErrorFields?.email ? req.formErrorFields.email : "",
        },
        {
            name: "password",
            label: "Wachtwoord",
            type: "password",
            err: req.formErrorFields?.password ? req.formErrorFields.password : "",
        },
    ];

    // get flash messages
    const flash = req.flash || null;

    res.render("login", { layout: "base", inputs, flash });
}

export const postLogin = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach((error) => {
            req.formErrorFields[error.path] = error.msg;
        });

        // set flash message
        req.flash = "Er zijn fouten gevonden in het formulier";

        // redirect to the login page
        return next();
    }

    // check if user exists
    const user = await User.query().findOne({ email: req.body.email });
    if (!user) {
        req.flash = "Gebruiker bestaat niet";
        return next();
    }

    // check password
    const match = bcrypt.compareSync(req.body.password, user.password);

    if (!match) {
        req.flash = "Wachtwoord is fout";
        return next();
    }

    // token
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        TOKEN_SALT,
        {
            expiresIn: "1h",
        }
    );

    // set cookie
    res.cookie("user", token, { httpOnly: true });

    // redirect to the home page
    res.redirect("/");

}



/**
 * ------------------------------
 *           REGISTER
 * ------------------------------
*/
export const register = async (req, res, next) => {
    // check errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.formErrorFields = {};
        errors.array().forEach((error) => {
            req.formErrorFields[error.path] = error.msg;
        });

        // set flash message
        req.flash = "Er zijn fouten gevonden in het formulier";

        // redirect to the login page
        return next();
    }

    // check if user exists
    const userExists = await User.query().findOne({ email: req.body.email });
    if (userExists) {
        req.flash = "Gebruiker bestaat al";
        return next();
    }

    // hash password
    const pass = bcrypt.hashSync(req.body.password, 10);

    const user = await User.query().insert({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: pass,
    });

    // redirect to the login page
    res.redirect("/login");
}

export const postRegister = async (req, res, next) => {

}


/**
 * ------------------------------
 *            LOGOUT
 * ------------------------------
*/
export const logout = async (req, res) => {
    res.clearCookie("user");
    res.redirect("/");
}






/**
 * ------------------------------
 *       UPDATE PASSWORD
 * ------------------------------
*/

export const updatePasswordPage = async (req, res, next) => {

    try {

        const token = req.params.token;

        if (!token) {
            return res.redirect("/login");
        }

        const data = jwt.verify(token, TOKEN_SALT);

        if (!data) {
            return res.redirect("/login");
        }

        if (!data.tag === "password") {
            return res.redirect("/login");
        }

        if (!data.email || !data.password) {
            return res.redirect("/login");
        }

        // get user id
        const user = await User.query().findOne({ email: data.email, password: data.password });
        
        if (!user) {
            return res.redirect("/login");
        }

        // get form inputs
        const inputs = [
            {
                name: "password1",
                label: "Wachtwoord",
                type: "password",
                err: req.formErrorFields?.password1 ? req.formErrorFields.password1 : "",
            },
            {
                name: "password2",
                label: "Wachtwoord",
                type: "password",
                err: req.formErrorFields?.password2 ? req.formErrorFields.password2 : "",
            },
        ];

        // get flash messages
        const flash = req.flash || null;

        res.render("update-password", { layout: "base", inputs, flash, token });

    } catch (error) {
        const data = {
            layout: "base",
            error: {
                message: error.message,
                code: 500
            }
        }
        res.status(500).render('error', data);
    }


}


export const updatePassword = async (req, res, next) => {

    try {
        // check errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.formErrorFields = {};
            errors.array().forEach((error) => {
                req.formErrorFields[error.path] = error.msg;
            });

            // set flash message
            req.flash = "Er zijn fouten gevonden in het formulier";

            // redirect to the login page
            return next();
        }

        // Check if both passwords are the same
        if (req.body.password1 !== req.body.password2) {
            req.flash = "Wachtwoorden komen niet overeen";
            return next();
        }

        const token = req.params.token;

        if (!token) {
            req.flash = "Token is niet geldig";
            return next();
        }

        const data = jwt.verify(token, TOKEN_SALT);
        if (!data) {
            req.flash = "Token is niet geldig";
            return next();
        }

        const user = await User.query().findOne({ email: data.email, password: data.password });

        if (!user) {
            return res.redirect("/login");
        }

        // hash password
        const pass = bcrypt.hashSync(req.body.password1, 10);

        await User.query().findById(user.id).patch({
            password: pass,
        });

        res.redirect("/login");

    } catch (error) {
        console.log(error);
        const data = {
            layout: "base",
            error: {
                message: error.message,
                code: 500
            }
        }
        res.status(500).render('error', data);
    }

}