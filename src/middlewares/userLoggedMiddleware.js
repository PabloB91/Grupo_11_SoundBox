function userLoggedMiddleware(req, res, next) {
        res.locals.userIsLogged = false
        res.locals.userIsAdmin = false
     
        const cookieUser = req.cookies.userCookie 
         if (req.session.admin) {
             res.locals.userIsAdmin = true
             res.locals.admin = req.session.admin
         }
     
        if(cookieUser){
            req.session.userLogged = req.cookies.userCookie
        }
     
        if (req.session.userLogged) {
         res.locals.userIsLogged = true
         res.locals.userLogged = req.session.userLogged
        }
        next()
     
}

module.exports = userLoggedMiddleware;