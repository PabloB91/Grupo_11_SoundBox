//--Middleware de ruta '/userProfile/:userId'.--//

//--> Si el usuario está logueado, y accede a la ruta '/userProfile/:userId'  continúa la ejecución del controlador que 
//-- lo envía a su página de perfil, si no, lo redirige al formulario de login.--//

function authMiddleware(req, res, next){
    if(req.session.userLoggedIn != undefined){
        console.log("En session se guardo el siguiente User to Log In: ");
        console.log(req.session.userLoggedIn);
        next();
    }else{
        console.log("else ");
        return res.redirect('/users/login')
    }
}

module.exports = authMiddleware;
