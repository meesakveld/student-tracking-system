import jwt from 'jsonwebtoken';
import { TOKEN_SALT } from '../consts.js';

export const generatePasswordJWT = (user) => {

    // Generate a password with user firstname and lastname and a random number and scramble it with a JWT token
    const password = user.firstname + user.lastname + Math.floor(Math.random() * 1000);
    const passwordJWTtoken = jwt.sign({ password }, TOKEN_SALT);

    const output = {
        user_id: user.id,
        password: passwordJWTtoken
    }

    const token = jwt.sign(output, TOKEN_SALT);
    
    return {
        passwordJWTtoken,
        token
    } 
}   

