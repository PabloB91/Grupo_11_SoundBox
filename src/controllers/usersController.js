// Requerimientos

const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const bcrypt = require("bcryptjs")

const { validationResult } = require("express-validator");
const { log } = require("console");
const e = require("method-override");

// Path y direcciones

const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");

const usersControllers = {

    // (GET) Formulario de Registro
    register: (req, res) => {
        res.render("forms/register")
    },
    
    // (POST) Proceso de Registro
    processToRegister: (req, res) => {

        const errores = validationResult(req);  //--->Traemos las validaciones
        // console.log(errores);

        if(!errores.isEmpty()){ //-->Si existen errores, se renderizan y además se renderizan los input de usuario que sean correctos en el objeto 'old' 
            console.log("Errores: ", errores);
            return res.render("forms/register.ejs", { errores: errores.array(), old: req.body}) 
        }else{
            res.render("forms/register.ejs")
            
        } 
        console.log("userDefinido: ",userDefinido);
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //--> Se trae el JSON de usuarios
        
        const passwordToValidate = req.body.password  //-->Se trae el password ingresado por el usuario, para su posterior hasheo
        
        newUser = {     //--> Se crea el objeto para un nuevo usuario
            userId: usersJson[usersJson.length - 1].userId + 1, //--> Corregí la creación de id, porque los creaba con valores 'null'
			name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(passwordToValidate, 10),
            imgProfile: req.file == undefined ? "alvaro.jpg" : req.file.filename
        }
                /* usersJson.push(newUser);  //--> Se agrega el nuevo usuario a la variable del JSON

		fs.writeFileSync(usersFilePath, JSON.stringify(usersJson, null, ' '));  //--> Se escribe el archivo JSON con la variable modificada */

		res.redirect('users/userProfile/')  //--> Se redirige al perfil del usuario
    },
       
    // (GET) Formulario de Login
    login: (req, res) => {
      res.render("forms/login.ejs");
    },

    // (POST) Proceso de Login
    processToLogin: (req, res) => {
        
        const errors = validationResult(req);
        
        if(errors.isEmpty()){
            /* aca estamos trayendo la lista de usuarios y la estamos convirtiendo a array */
            const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
            /**
             * en las siguientes lineas de codigo estamos leyendo el array pasado anteriormente
             * y si usersJSON es estrictamente igual a "" 
             */
            let users;

            if (usersJSON === ""){
                users = [];
            }else {
                users = usersJSON;
            }
            
            let userToLogIn; 
            /**
             * si existe el usuario en la db en tonces vamos a renderizar
             *  `/users/userProfile/:id`con el siguiente codigo
            */
            for(let user = 0; user<users.length; user++ ) {
                /* en el siguiente if estamos diciendo si dentro de usuarios hay un
                usuario con correo y el correo es estrictamente igual al que se esta
                pasando por body y además si la contraseña matcheada y la contraseña y el email coinciden vamos a guardar de usuarios un usuario y break */
                if (users[user].email === req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[user].password)){
                        userToLogIn = users[user];
                        break;
                    }
                }
            }

            /**
             * en la siguiente sentencia de codigo estamos diciendo que si el usuario
             * logueado tiene algun campo que no coincida que la contrasena o el 
             * email no coinsidan con los registrados en la db entonces vamos a 
             * enviar un error
            */
            if (userToLogIn === undefined){
                res.render("forms/login.ejs", { errors : [
                       {msg: 'La contraseña o el correo no coinciden'}
                    ], 
                    old: req.body
                });
            }
            /**
             * si el usuario ingresó satisfactoriamente vamos a guardar sus datos en 
             * session --> userTologIn
             */
            console.log(userToLogIn);
            delete userToLogIn.password  //--> Borramos el password de la variable guardada en session, por seguridad

            req.session.userLoggedIn = userToLogIn;  

            if (req.body.remember != undefined){        //--> Creación de cookie con el email del usuario, para poder recuperar la sesión 
                                                        //--> Si el usuario clickea el checkbox, se crea la cookie. 'req.body.remember' es el elemento HTML del checkbox
                                                        //--> Entonces si ese elemento NO es indefinido (al clickearse, toma el valor de 'on'), se crea la cookie.
                console.log(req.body.remember);/* (verificar el valor del checkbox) */         
                res.cookie('remember', userToLogIn.email, {maxAge: 60000})
            }

            /* este redirect actúa solo si el usuario existe en el db */
            res.redirect(`/users/userProfile/${userToLogIn.userId}`);
        }else{
            return res.render("forms/login.ejs", { errors: errors.array(), old: req.body });
        }
    },

    // (GET) Perfil del Usuario
    userProfile: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let userId = req.params.userId

		let userDefinido = usersJson.find(user => {
			return user.userId == userId;
		})
        
		if(userDefinido){
			res.render("user/userProfile.ejs", { user : userDefinido });
		} else {
            res.render("forms/register.ejs");
		}

        console.log("user Profile");
        console.log(req.session);

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