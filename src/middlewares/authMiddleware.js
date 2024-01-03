const fs = require ("fs");


function logMiddleware (req, res, next) {
    let admin = true
    if(admin == true){

        next();
    }else{


    }

}

module.exports = logMiddleware;