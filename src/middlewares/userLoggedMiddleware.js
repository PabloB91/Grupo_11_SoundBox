function userLoggedMiddleware(req, res, next) {
    res.locals.userIsLogged = false
    res.locals.userIsAdmin = false

    const cookieUser = req.cookies.userCookie

    if (req.session.admin) {
        res.locals.userIsAdmin = true
        res.locals.admin = req.session.admin
    }

    if (cookieUser) {
        // Verifica si el usuario existe en la base de datos
        User.findOne({ username: cookieUser }, (err, user) => {
            if (err) {
                console.log(err)
            } else if (user) {
                req.session.userLogged = user
                res.locals.userIsLogged = true
                res.locals.userLogged = user
            }
        })
    }

    next()
}

module.exports = userLoggedMiddleware;