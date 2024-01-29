function authMiddleware(req, res, next){
    if(req.session.userToLogIn != undefined){
        next();
    }else{
        
    }
}

module.exports = authMiddleware;
