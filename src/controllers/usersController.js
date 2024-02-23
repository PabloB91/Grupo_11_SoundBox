// Requerimientos

const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const bcrypt = require("bcryptjs")
const e = require("method-override");
const db = require("../database/models")

const { validationResult } = require("express-validator");
const { log } = require("console");

const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");


const usersControllers = {

    // (GET) Formulario de Registro
    register: (req, res) => {
        res.render("forms/register")
    },
    // (POST) Proceso de Registro
    processToRegister: async (req, res) => {
        try{
            const errores = validationResult(req);  //--->Traemos las validaciones
            // console.log(errores);

            let country_registro;  //--> Esto es para tomar el valor de país del input de usuario y guardarlo con el Id correspondiente
            if (req.body.country == 'Argentina'){
                country_registro= 1
            }else if(req.body.country == 'Colombia'){
                country_registro= 2
            }
        
            if(!errores.isEmpty()){ //-->Si existen errores, se renderizan y además se renderizan los input de usuario que sean correctos en el objeto 'old' 
                //console.log("Errores: ", errores);
                return res.render("forms/register.ejs", { errores: errores.array(), old: req.body}) 
            }else{
                const passwordToValidate = req.body.password  //-->Se trae el password ingresado por el usuario, para su posterior hasheo
                //--> Se llama al método de Sequelize 'create' para crear un registro en la DB 
                let CreateUser= await db.Usuarios.create({
                    first_name: req.body.name,      //-->Los nombres de los campos tienen que ser iguales a los nombres del modelo 'Usuario' de DB
                    last_name: req.body.lastName,
                    e_mail: req.body.email,
                    password: bcrypt.hashSync(passwordToValidate, 10),
                    image: req.file == undefined ? "alvaro.jpg" : req.file.filename,
                    registered_date: Date.now(),    //--> Esta función trae la fecha actual

                    user_type_id: 2,    //--> En este caso el Id debería ser siempre '2', porque es el que corresponde a 'common_user'
                                        //--Definir cómo vamos a crear el usuario 'admin', que debería ser creado una sola vez.
                    country_id: country_registro     
                })               
                console.log("usuario a crear: ",CreateUser);  //--> Muestra por consola cómo quedó el registro que se inserta en la BD
                return res.redirect('login')  //--> Una vez creado el registro en la DB. se redirige a la página de logueo
            }
        }   //--Hay que usar 'return' para evitar el error de '[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client'
        catch(err) {
            return console.log(err); //--> Esto nos muestra en la consola si es que hubo algún error en el proceso
        }
    },

    // (GET) Formulario de Login
    login: (req, res) => {
      res.render("forms/login.ejs");
    },

    // (POST) Proceso de Login
    processToLogin: async (req, res) => {
        let userToLogIn;   //--> Creamos la variable del usuario a loguearse 
        
        try{
            const errors = validationResult(req);
            if(errors.isEmpty()){
                let userToFind= await db.Usuarios.findOne({   //--> Crea una variable 'userToFind', que busca el usuario en la DB según el e_mail del formulario
                        where:{
                            e_mail: req.body.email
                        }
                    })
                /* console.log("usuario a encontrar: ",userToFind) ; */

                if (req.body.email === userToFind.e_mail) {     //--> Si el e_mail ingresado coincide con alguno buscado en la DB, pasa a comparar las contraseñas
                    if (bcrypt.compareSync(req.body.password, userToFind.password)){
                        if (req.body.remember != undefined){        //--> Creación de cookie con el email del usuario, para poder recuperar la sesión 
                            //--> Si el usuario clickea el checkbox, se crea la cookie. 'req.body.remember' es el elemento HTML del checkbox
                            //--> Entonces si ese elemento NO es indefinido (al clickearse, toma el valor de 'on'), se crea la cookie.
                            console.log(req.body.remember);/* (verificar el valor del checkbox) */         
                            res.cookie('remember', userToLogIn.e_mail, {maxAge: 60000})
                            console.log(req.session.userLoggedIn);
                            delete userToLogIn['dataValues'].password //--> Borramos el password de la variable a guardar en session, por seguridad
                            delete userToLogIn['_previousDataValues'].password 
                            userToLogIn = userToFind;   
                            req.session.userLoggedIn = userToLogIn;
                            }
                        userToLogIn = userToFind;              //--> Si las contraseñas coinciden, hacemos que la variable usuario a loguearse sea igual al usuario encontrado en la DB
                    }else {
                        return res.render("forms/login.ejs", { errors : [    //--> Si no coinciden las contraseñas vuelve al login con el mensaje de error.
                                {msg: 'La contraseña no concide'}
                            ], 
                            old: req.body
                        }); 
                    }
                }

                /*console.log("usertoLogin: ",userToLogIn); */
                /* console.log(userToLogIn['dataValues']); */
                delete userToLogIn['dataValues'].password //--> Borramos el password de la variable a guardar en session, por seguridad
                delete userToLogIn['_previousDataValues'].password 
                req.session.userLoggedIn = userToLogIn;  //--> Si el usuario ingresó satisfactoriamente vamos a guardar sus datos en 'session' --> 'userLoggedIn'
                 console.log('session: ', req.session);  
                 console.log('session: ', req.session.userLoggedIn); 

                

                /* este redirect actúa solo si el usuario existe en el db */
                console.log('redirect');
                console.log(userToLogIn.id);
                console.log('session userloggedin Id: ', req.session.userLoggedIn.id);
                return res.redirect(`/users/userProfile/${userToLogIn.id}`);
            }else{

                return res.render("forms/login.ejs", { errors: errors.array(), old: req.body });
            }
        }
        catch{
            console.log("catch usertoLogin: ",userToLogIn);
            /**
                 * en la siguiente sentencia de codigo estamos diciendo que si el usuario
                 * logueado tiene algun campo que no coincida que la contrasena o el 
                 * email no coinsidan con los registrados en la db entonces vamos a 
                 * enviar un error
                */
            if (userToLogIn === undefined){
                return res.render("forms/login.ejs", { errors : [
                    {msg: 'EL correo no coincide o este usuario aún no es parte de SoundBox'}
                    ], 
                    old: req.body
                });
                }
        }       //--> Acá termina todo el 'try-catch'
    },

    // (GET) Perfil del Usuario
    userProfile: async (req, res) => {
        try{
            let user= await db.Usuarios.findByPk(req.params.id) //--> Busca el usuario en la BD según su Id
            return res.render('user/userProfile.ejs', {user})
        }   //--Hay que usar 'return' para evitar el error de '[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client'
        catch(err) {
            console.log(err);
            return res.render("not-found")
        } 
        //console.log("user Profile");
        //console.log(req.session);
    },

    // (GET) Edición de Usuario
    preference: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

		const usersToEdit = usersJson.find((users) => {
			return users.id == req.params.id;
		}) 

		res.render("user/userEdit.ejs", {usersToEdit})
    },

    // (PUT) Editar Usuario
    editPreferences: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

		const id = req.params.id;
		let usersToEdit = usersJson.find(users => users.id == id);

		usersToEdit = {
			userId: usersToEdit.id,
			name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            imgProfile: req.file == undefined ? "alvaro.jpg" : req.file.filename
		}

		let indice = usersJson.findIndex(users => {
			return users.id == id
		})

		usersJson[indice] = usersToEdit;

		fs.writeFileSync(usersFilePath, JSON.stringify(usersJson, null, " "));
		res.redirect("users/userProfile/" + usersToEdit.id)
    },

    delete: (req, res) => {

        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

		// eliminar
		users = usersJson.filter(user =>{           //--> Buscamos el usuario seleccionado dentro del json
			return user.userId != req.params.id;    //--> Se devuelven todos los usuarios excepto el seleccionado
		})

		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "))

		res.redirect("/admin/usersList")
	}
}

module.exports = usersControllers;