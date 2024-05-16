import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



/**
 * ------------------------------
 *            LOGIN
 * ------------------------------
*/
export const login = async (req, res, next) => {
    res.render("login");
}

export const postLogin = async (req, res, next) => {

}



/**
 * ------------------------------
 *           REGISTER
 * ------------------------------
*/
export const register = async (req, res, next) => {
   
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