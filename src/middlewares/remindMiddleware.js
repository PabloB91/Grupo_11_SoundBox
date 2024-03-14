//-- Middleware para recordar sesión de usuario

//--> Si el usuario se logea y activa el checkbox de recordar sesión, se guarda una cookie (con tiempo de vencimiento) para poder recuperar la sesión
//-- en caso de cerrar el navegador. Si el usuario se loguea sin activar el checkbox, no se guarda la cookie y la sesión se terminará en caso de cerrar el navegador.

//--Requerimos todos los módulos necesarios--//
const { log } = require("console");
const db = require("../database/models");

function remindMiddleware(req, res, next) {
	if (
		req.cookies.remember != undefined &&
		req.session.userLoggedIn == undefined
	) {
		//--> Si existe la cookie Y la sesión NO existe, sigue con el proceso
		/* console.log("userLoggedIn :", req.session.userLoggedIn);
		console.log("useremail de cookie: ", req.cookies.remember) */ try {
			let userToFind = db.Usuarios.findOne({
				//--> Crea una variable 'userToFind', que busca el usuario en la DB según el e_mail del formulario
				where: {
					e_mail: req.cookies.remember,
				},
				include: [
					{ association: "user_type" }, //--> Se incluye el tipo de usuario porque el middleware 'userLoggedMiddleware' lo requiere
				],
			}).then(function (userToFind) {
				/* console.log("usuario a encontrar: ", userToFind);
				console.log(userToFind.e_mail); */
				if (userToFind.e_mail === req.cookies.remember) {
					req.session.userLoggedIn = userToFind;
					/* console.log(
						"usuario ya logueado:",
						req.session.userLoggedIn
					); */
				}
				/* console.log(
					"remindMiddleware: Se recupera la sesión del usuario"
				); */
				/* 	console.log(req.session.userLoggedIn);
				console.log("Redirect del Recuérdame"); */
				res.redirect("/");
			});
		} catch (err) {
			/* console.log(err); */ return res.render("errors/404.ejs");
		}
	}
	next(); //--> Luego de recuperar la sesión, permite seguir ejecutando la ruta para el controlador del login
}

module.exports = remindMiddleware;
