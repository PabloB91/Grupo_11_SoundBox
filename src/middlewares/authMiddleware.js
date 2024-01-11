const fs = require ("fs");


function authMiddleware (req, res, next) {
    let admin = false
    if(admin == true){
        res.redirect("administrador")
    }else{

    }
    
    next();
}

module.exports = authMiddleware;