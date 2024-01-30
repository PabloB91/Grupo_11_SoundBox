function gestMiddleware(req, res, next){
    if(req.session.userToLogIn == undefined){
        next();
    }else{
        return res.redirect("/users/register")
    }
}

module.exports = gestMiddleware;