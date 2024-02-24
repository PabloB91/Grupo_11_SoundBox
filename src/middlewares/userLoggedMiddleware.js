function userLoggedMiddleware(req, res, next) {
        res.locals.userIsLogged = false //----> esta variable se en el header.ejs es la que define dentro del if si el usuario esta logueado o no, de momento es false.

        if (req.session.userLoggedIn) {
         res.locals.userIsLogged = true //----> y aca la misma variable cambia a true ya que hay un usuario logueado dontro del sessions. entonces en el if del header.ejs mostramos parte del header o no, segun el valor de la misma.
         
        }
        
        // if (req.session.userLoggedIn.db.user.user_type_id == 2) {
        //         req.session.admin = userLoggedIn.dataValues;
        //         console.log(req.session.admin, 'este usuario es admin');
        //     } else {
        //         console.log(req.session.admin, 'este usuario es comun');
        //     }  

        next()
     
}

module.exports = userLoggedMiddleware;