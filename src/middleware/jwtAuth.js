import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { TOKEN_SALT } from '../consts.js';

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

        const user = await User.query().findById(userData.id);
        if (!user) {
            return res.redirect('/login');
        }

        req.user = user;

        return next()
    } catch (error) {
        res.redirect('/login');
    }

}