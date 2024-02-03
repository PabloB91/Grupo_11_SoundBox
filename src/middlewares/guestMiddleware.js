//--Middleware de ruta para visitantes.--//

//--> Si el usuario está logueado, y accede a la ruta seleccionada lo envía a su página de perfil, si no, continúa la ejecución del controlador, 
//-- que lo envía al formulario de login--//

function guestMiddleware(req, res, next){
    if(req.session.userLoggedIn){
        //console.log("middleware userLoggedIn");
        //console.log(req.session.userLoggedIn); 
        return res.redirect(`/users/userProfile/${req.session.userLoggedIn.userId}`)
    }else{
        //console.log("guest middleware else"); 
        next()
    }
}

module.exports = guestMiddleware;