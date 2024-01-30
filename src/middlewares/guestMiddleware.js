function gestMiddleware(req, res, next){
    if(req.session.userToLogIn == undefined){
        next();
    }else{
        
    }
}

module.exports = gestMiddleware;