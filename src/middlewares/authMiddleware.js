function authMiddleware(req, res, next){
    if(req.session.userWhenLoggingIn != undefined){
        next();
    }else{
        
    }
}

module.exports = authMiddleware;
