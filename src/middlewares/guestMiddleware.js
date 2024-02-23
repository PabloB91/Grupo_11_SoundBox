//--Middleware de ruta para visitantes.--//

//--> Si el usuario está logueado, y accede a la ruta de ingresar o crear cuenta lo envía a su página de perfil, si no, continúa la ejecución del controlador, 
//-- que lo envía al formulario de login--//

function guestMiddleware(req, res, next){
    if(req.session.userLoggedIn){
        console.log("Guest middleware: el usuario ya está logueado");
        console.log("Usuario: ",req.session.userLoggedIn);
        console.log("Continúa a la página de perfil"); 
        return res.redirect(`/users/userProfile/${req.session.userLoggedIn.id}`)
    }else{
        console.log("Guest middleware: el usuario no está logueado"); 
        console.log("Usuario: ",req.session.userLoggedIn);
        console.log("Continúa a la página de login o register"); 
        // console.log("middleware userLoggedIn");
        // console.log(req.session.userLoggedIn); 
        next()
    }
}

module.exports = guestMiddleware;