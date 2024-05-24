import { getEmployeeById } from '../services/models/Employee.js';

export default (roles = [], functions = []) => async (req, res, next) => {

    if (!req.user) {
        return res.redirect('/login');
    }

    if (!roles.includes(req.user.role.title)) {
        return res.render('error', { message: 'You do not have permission to access this page' });
    }

    if (roles.includes('employee')) {
        const employee = await getEmployeeById(req.user.id, ['function']);

        if (!employee.function.includes(functions)) {
            return res.render('error', { message: 'You do not have permission to access this page' });
        }
    }

    return next();
}