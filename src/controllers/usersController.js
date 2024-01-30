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
    
    // (GET) Dinamismo de los Usuarios
    userProfile: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let userId = req.session.userId

		let userDefinido = usersJson.find(user => {
			return user.userId == userId;

		})

		if(userDefinido){
<<<<<<< HEAD
			res.render("user");
=======
			res.render("user/userProfile.ejs", { user : userDefinido });
>>>>>>> 7e7cdb526a73da95dc41165bf1d9413cbbe069ce

		} else {
            res.render("forms/register.ejs");

		}

<<<<<<< HEAD
        res.render("user", { user : userDefinido });
=======
        res.render("user/userProfile.ejs");
>>>>>>> 7e7cdb526a73da95dc41165bf1d9413cbbe069ce

    },

    // (GET) Login Estatico
    login: (req, res) => {

      res.render("forms/login.ejs");
    },

    // (POST) Proceso Login
    processToLogin: (req, res) => {
        
        const errors = validationResult(req);
        
        if (errors.isEmpty()) {

            /* aca estamos trayensdo la lista de usuarios y la estamos convirtiendo a array */
            const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

<<<<<<< HEAD
=======
            console.log(usersJSON)
            
            /**
             * en las siguientes lineas de codigo estamos leyendon el array pasado anteriormente
             * y si usersJSON es estrictamente igual a "" 
             */
            
>>>>>>> 7e7cdb526a73da95dc41165bf1d9413cbbe069ce
            let users;

            if (usersJSON === ""){
                users = [];
            }else {
                users = usersJSON;
            }
            
            let userToLogIn; 
<<<<<<< HEAD
=======

            /**
             * si existe el usuario en la db en tonces vamos a renderizar
             *  `/users/userProfile/:id`con el siguiente codigo
            */
>>>>>>> 7e7cdb526a73da95dc41165bf1d9413cbbe069ce

            for(let user = 0; user<users.length; user++ ) {
                /* en el siguiente if estamos diciendo si dentro de usuarios hay un
                usuario con correo y el correo es estrctamente igual al que se esta
                pasando por body y adema si la contrasena macheada y la contrasena y el email coinsiden vamos a guardar de usuarios un usuario y break */
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
            
<<<<<<< HEAD
            if (userToLogIn == undefined) {
            
            res.render("form/login.ejs", { errors : [
=======
            res.render("forms/login.ejs", { errors : [
>>>>>>> 7e7cdb526a73da95dc41165bf1d9413cbbe069ce
           
                       {msg: 'La contraseña o el correo no coinciden'}
                    ], 
                    old: req.body
                });
            }
            
<<<<<<< HEAD
            req.session.userLogged = userToLogIn;

            res.render(`user`, { user: userToLogIn });

        }else{
            return res.render("/login.ejs", { errors });
        }
=======
            /**
             * sie l usuario ingreso satisfactoriamente vamos a guardar sus datos en 
             * userTologIn
             */
            req.session.userLoggedIn = userToLogIn;
 
            /* este redict actua solo si el usuario exixte en el db */
            res.redirect(`/users/userProfile/${userToLogIn.userId}`);
        }else{
>>>>>>> 7e7cdb526a73da95dc41165bf1d9413cbbe069ce

            return res.render("forms/login.ejs", { errors: errors.array(), old: req.body });
        
        }
    },

    // (GET) Registro Estatico
    register: (req, res) => {
        res.render("forms/register")
    },
    
    // (POST) Proceso Registro
    processToRegister: (req, res) => {

        const errores = validationResult(req);  //--->Traemos las validaciones
        // console.log(errores);

        if(!errores.isEmpty()){ //-->Si existen errores, se renderizan y además se renderizan los input de usuario que sean correctos en el objeto 'old' 
            console.log("Errores: ", errores);
            return res.render("forms/register.ejs", { errores: errores.array(), old: req.body}) 
        }else{
            res.render("forms/register.ejs")
            
        } 

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
        
        usersJson.push(newUser);  //--> Se agrega el nuevo usuario a la variable del JSON

		fs.writeFileSync(usersFilePath, JSON.stringify(usersJson, null, ' '));  //--> Se escribe el archivo JSON con la variable modificada

		res.redirect('users/userProfile/')  //--> Se redirige al perfil del usuario
    },

    // (GET) Editar Estatico
    preference: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

		const usersToEdit = usersJson.find((users) => {

			return users.id == req.params.id;

		}) 

		res.render("user/userEdit.ejs", {usersToEdit})
    },

    // (PUT) Editar Usuario
    editProferences: (req, res) => {
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
    }

}

module.exports = usersControllers;