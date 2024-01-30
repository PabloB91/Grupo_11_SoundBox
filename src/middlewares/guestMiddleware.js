function gestMiddleware(req, res, next){
    if(req.session.userLogged){
        next();
    }else{
        return res.redirect("/users/register")
    }
}

module.exports = gestMiddleware;