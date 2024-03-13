
function userLoggedMiddleware(req, res, next) {
        res.locals.userIsLogged = false //----> esta variable se en el header.ejs es la que define dentro del if si el usuario esta logueado o no, de momento es false.
        res.locals.userIsAdmin = false
        /* console.log("session en user logged middleware: ",req.session.userLoggedIn); */
        if (req.session.userLoggedIn && req.session.userLoggedIn.user_type.user_type == 'common_user') {
/*                 console.log("userLoggedMiddleware");
                console.log("El usuario es de tipo: ",req.session.userType);
 */
                res.locals.userIsLogged = true; //----> y aca la misma variable cambia a true ya que hay un usuario logueado dentro del sessions. entonces en el if del header.ejs mostramos parte del header o no, segun el valor de la misma.
                res.locals.userLoggedIn = req.session.userLoggedIn;
        }else if (req.session.userLoggedIn && req.session.userLoggedIn.user_type.user_type == 'admin'){
                /* console.log("userLoggedMiddleware");
                console.log(req.session.userLoggedIn); */
                
                res.locals.userIsLogged = true;
                res.locals.userIsAdmin = true,

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