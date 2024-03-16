//--Middleware de ruta para usuarios logueados.--//

// Se crea un objeto con distintos métodos para permitir ejecutar rutas a cada tipo de usuario

const auth = {
    // Método para permitir accesos a rutas de usuario administrador
    admin: (req, res, next) => {        //--> Si el usuario está logueado y es igual a 'admin', y accede a la ruta seleccionada, continúa la ejecución del controlador de esa ruta, 
                                        //-- si no, lo redirige al formulario de login.--//
        if (req.session.userLoggedIn != undefined && req.session.userLoggedIn.user_type.user_type == 'admin') {
            /* console.log("Auth middleware: Usuario logueado como Administrador, estos son los datos guardados en session: ");
            console.log(req.session.userLoggedIn);
            console.log("Continúa la ejecución de la ruta seleccionada"); */
            /* console.log("En session se guardo el siguiente User to Log In: ");
            console.log(req.session.userLoggedIn);  */
            next();
        }else{ 
            /* console.log("Auth middleware: el usuario no está logueado"); 
            console.log("Usuario: ",req.session.userLoggedIn);
            console.log("Continúa a la página de login"); */  
            return res.redirect('/users/login')
        }
    },

    // Método para permitir acceso a rutas de usuarios comunes
    common_user: (req, res, next) => {        //--> Si el usuario está logueado y es distinto a 'admin', y accede a la ruta seleccionada, continúa la ejecución del controlador de esa ruta, 
                                            //-- si no, lo redirige al formulario de login.--//
        if(req.session.userLoggedIn != undefined && req.session.userLoggedIn.user_type.user_type != 'admin'){
            /* console.log("Auth middleware: Usuario logueado como Usuario Común, estos son los datos guardados en session: ");
            console.log(req.session.userLoggedIn);
            console.log("Continúa la ejecución de la ruta seleccionada"); */
            /* console.log("En session se guardo el siguiente User to Log In: ");
            console.log(req.session.userLoggedIn);  */
            next();
        }else{ 
            /* console.log("Auth middleware: el usuario no está logueado"); 
            console.log("Usuario: ",req.session.userLoggedIn);
            console.log("Continúa a la página de login");   */
            return res.redirect('/users/login')
        }
    },
    // Filtro de usuario, sirve para que un usuario común sólo pueda ingresar a su perfil
    profile_filter: (req,res,next)=>{       //--> Si el Id del pedido HTTP es igual al Id del usuario logueado, y accede a la ruta seleccionada, continúa la ejecución del controlador de esa ruta, 
                                            //-- si no, lo redirige al index.--//
        if(req.params.id == req.session.userLoggedIn.id ) {
            /* console.log("El usuario ingresa a su perfil"); */
            next()
        }else{
            /* console.log("El usuario está intando ingresar a otro perfil"); */
            return res.redirect('/')
        }
    }
}


/* function authMiddleware(req, res, next){
    if(req.session.userLoggedIn != undefined && req.session.userLoggedIn.user_type.user_type != 'admin'){
        console.log("Auth middleware: Usuario logueado como Usuario Común, estos son los datos guardados en session: ");
        console.log(req.session.userLoggedIn);
        console.log("Continúa la ejecución de la ruta seleccionada");
        // console.log("En session se guardo el siguiente User to Log In: ");
        //console.log(req.session.userLoggedIn);  
        next();
    }else if (req.session.userLoggedIn != undefined && req.session.userLoggedIn.user_type.user_type == 'admin') {
        console.log("Auth middleware: Usuario logueado como Administrador, estos son los datos guardados en session: ");
        console.log(req.session.userLoggedIn);
        console.log("Continúa la ejecución de la ruta seleccionada");
        //console.log("En session se guardo el siguiente User to Log In: ");
        //console.log(req.session.userLoggedIn);  
        next();
    }else{ 
        console.log("Auth middleware: el usuario no está logueado"); 
        console.log("Usuario: ",req.session.userLoggedIn);
        console.log("Continúa a la página de login");  
        return res.redirect('/users/login')
    }
}
 */

module.exports = auth;
