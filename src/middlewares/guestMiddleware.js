function gestMiddleware(req, res, next){
    if(req.session.userToLogIn == undefined){
        next();
    }else{
         res.redirect("/users/login")
    }
}

module.exports = gestMiddleware;