function authMiddlewares (req, res, next) {
    if (req.session.userLogged) {
        res.redirect("/login");
    } else {

    }
    next();
    
};

module.exports = authMiddlewares;