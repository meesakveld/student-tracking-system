import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { TOKEN_SALT } from '../consts.js';
import { getUserById } from '../services/models/User.js';

export default async (req, res, next) => {

    try {
        const userToken = req.cookies.user;

        if (!userToken) {
            if (req.path === '/welcome' || req.path === '/login') {
                return next();
            }
            return res.redirect('/welcome');   
        }
        const userData = jwt.verify(userToken, TOKEN_SALT);
        if (!userData) {
            return res.redirect('/welcome');
        }

        const user = await getUserById(userData.id, '[role]');
        if (!user && req.path !== '/login') {
            return res.redirect('/login');
        }

        req.user = user;
        delete req.user.password;

        return next()
    } catch (error) {
        res.clearCookie("user");
        res.redirect('/login');
    }

}