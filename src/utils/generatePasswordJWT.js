import jwt from 'jsonwebtoken';
import { TOKEN_SALT } from '../consts.js';
import bcrypt from 'bcrypt';

export const generatePasswordJWT = (user) => {

    // Generate a password with user firstname and lastname and a random number and scramble it with a JWT token
    const password = user.firstname + user.lastname + Math.floor(Math.random() * 1000);
    const passwordBcrypt = user.password ? user.password : bcrypt.hashSync(password, 10);

    const token = jwt.sign({
        email: user.email,
        password: passwordBcrypt,
        tag: 'password'
    }, TOKEN_SALT, { expiresIn: '1h' });
    
    return {
        passwordBcrypt: passwordBcrypt,
        token: token
    } 
}   

