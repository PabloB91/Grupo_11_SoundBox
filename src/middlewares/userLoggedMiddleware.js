
function userLoggedMiddleware(req, res, next) {
        res.locals.userIsLogged = false //----> esta variable se en el header.ejs es la que define dentro del if si el usuario esta logueado o no, de momento es false.
        res.locals.userIsAdmin = false

        if (req.session.userLoggedIn) {
                res.locals.userIsLogged = true; //----> y aca la misma variable cambia a true ya que hay un usuario logueado dentro del sessions. entonces en el if del header.ejs mostramos parte del header o no, segun el valor de la misma.
                res.locals.userLoggedIn = req.session.userLoggedIn;
        }
        // const cookieUser = req.cookies.userCookie 
        // if (req.session.userLoggedIn.db.user.user_type_id == 2) {
        //         res.locals.admin = true;
        //         console.log(req.session.admin, 'este usuario es admin');
        //     }

        next()

}

module.exports = userLoggedMiddleware;