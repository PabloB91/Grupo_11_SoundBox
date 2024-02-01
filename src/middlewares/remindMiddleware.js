//-- Middleware para recordar sesión de usuario 

//--> Si el usuario se logea y activa el checkbox de recordar sesión, se guarda una cookie (con tiempo de vencimiento) para poder recuperar la sesión 
//-- en caso de cerrar el navegador. Si el usuario se loguea sin activar el checkbox, no se guarda la cookie y la sesión se terminará en caso de cerrar el navegador. 

//--Requerimos todos los módulos necesarios--//
const fs = require("fs");
const path = require("path")
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");

function remindMiddleware(req, res, next) {

    if (req.cookies.remember != undefined && req.session.userToLogin == undefined) {  //--> Si existe la cookie Y la sesión NO existe, sigue con el proceso
  
    // Se copia el código de usersController.js que lee a todos los usuarios que ingresan uno por uno (ver entre línea 71 y 100)
    const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            
        let users;

        if (usersJSON === ""){
                users = [];
        }else{
                users = usersJSON;
        }
            
        let userToLogIn;
        for(let user = 0; user<users.length; user++ ) {  //-->Se busca el usuario en la base de datos (usersJSON), tomando como referencia de búsqueda el email guardado en la cookie.
                                                        //--> 'res.cookies.remember' es la cookie con el email.
            if (users[user].email === req.cookies.remember) {
                userToLogIn = users[user];
                break;
            }
        }
        /* console.log(userToLogIn); */
        req.session.userLoggedIn = userToLogIn;  //--> Acá decimos que el usuario logueado en la sesión es el que encontramos en la base de datos según nuestra cookie.
        /* console.log("remindmeMiddleware");
        console.log(req.session); */
    } 
    next();  //--> Luego de recuperar la sesión, permite seguir ejecutando la ruta para el controlador del login
}

module.exports = remindMiddleware;