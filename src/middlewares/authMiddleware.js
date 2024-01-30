function authMiddleware(req, res, next){
    if(!req.session.userLogged) {
        return res.redirect("/users/login")
    } else {
        next();
        // res.send("debe registrarse antes de inscribirse")
    }
}

module.exports = authMiddleware;
