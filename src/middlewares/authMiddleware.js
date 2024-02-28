//--Middleware de ruta para usuarios logueados.--//

//--> Si el usuario está logueado, y accede a la ruta seleccionada, continúa la ejecución del controlador de esa ruta, 
//-- si no, lo redirige al formulario de login.--//

function authMiddleware(req, res, next){

    if(req.session.userLoggedIn != undefined){
        console.log("Auth middleware: Usuario ya logueado, estos son los datos guardados en session: ");
        console.log(req.session.userLoggedIn);
        console.log("Continúa la ejecución de la ruta seleccionada");
        /* console.log("En session se guardo el siguiente User to Log In: ");
        console.log(req.session.userLoggedIn);  */
        next();
    }else{ 
        console.log("Auth middleware: el usuario no está logueado"); 
        console.log("Usuario: ",req.session.userLoggedIn);
        console.log("Continúa a la página de login");  
        return res.redirect('/users/login')
    }
}

module.exports = authMiddleware;
