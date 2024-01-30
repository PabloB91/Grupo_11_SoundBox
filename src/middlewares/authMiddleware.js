function authMiddleware(req, res, next){
    if(req.session.userToLogIn != undefined){
        next();
        // res.send("debe registrarse antes de inscribirse")
    }
}

module.exports = authMiddleware;
