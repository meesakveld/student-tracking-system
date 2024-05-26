export default (req, res, next) => {

    if (req.user.role.title === "student" && parseInt(req.params.id) !== req.user.id) {
        res.render("error", { user: req.user, error: { code: 403, message: 'Je hebt geen toegang tot deze pagina' }})
    } else {
        next()
    }

}