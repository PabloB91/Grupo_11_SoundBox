function authMiddlewares (req, res, next) {
    if (req.sessions.LogguedUser != undefined) {
        next();
    } else {
        
        res.redirect("/login");
    }
    
};

module.exports = authMiddlewares;
