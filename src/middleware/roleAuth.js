export default (roles = []) => async (req, res, next) => {

    if (!req.user) {
        return res.redirect('/login');
    }

    if (!roles.includes(req.user.role)) {
        return res.render('error', { message: 'You do not have permission to access this page' });
    }

    return next();
}