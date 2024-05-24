import { getEmployeeById } from '../services/models/Employee.js';

/**
 * Middleware function for role-based authentication.
 * 
 * @param {string[]} roles - An array of roles allowed to access the route. Options: 'admin', 'employee', 'student'.
 * @param {string[]} functions - An array of functions allowed for employees.
 * @returns {Function} - The middleware function.
 */
export default (roles = [], functions = []) => async (req, res, next) => {

    if (!req.user) {
        return res.redirect('/login');
    }

    if (!roles.includes(req.user.role.title)) {
        return res.render('error', { user: req.user, error: { code: 403, message: 'Je hebt geen toegang tot deze pagina' }});
    }

    if (roles.includes('employee') && req.user.role.title === 'employee' && functions.length > 0) {
        try {
            const employee = await getEmployeeById(parseInt(req.user.id), '[functions]');
            const employeeFunctions = employee.functions.map(item => item.title);
            if (!functions.some(r => employeeFunctions.includes(r))) {
                return res.render('error', { user: req.user, error: { code: 403, message: 'Je hebt geen toegang tot deze pagina' }});
            }
        } catch (error) {
            return res.render('error', { user: req.user, error: { code: 403, message: 'Je hebt geen toegang tot deze pagina' }});
        }
    }

    return next();
}