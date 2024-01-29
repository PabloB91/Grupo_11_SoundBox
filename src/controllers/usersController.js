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
    user: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let userId = req.params.userId

		let userDefinido = usersJson.find(user => {
			return user.userId == userId;

		})

		if(userDefinido){
			res.render("user", { user : userDefinido });

		} else {
            res.render("register");

		}

        res.render("user");

    },

    // (GET) Login Estatico
    login: (req, res) => {

      res.render("login.ejs");
    },

    // (POST) Proceso Login
    processToLogin: (req, res) => {
        
        const errors = validationResult(req);
        
        if(errors.isEmpty()){

            const usersJSON = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

            /* console.log(usersJSON); */

            let users;

            if (usersJSON === ""){
                users = [];
            }else {
                users = usersJSON;
            }
            
            /* let userWhenLoggingIn = users.find(user => user.email === req.body.email); */
            let userWhenLoggingIn; 

            for(let user = 0; user<users.length; user++ ) {

                if (users[user].email == req.body.email) {

                    if (bcrypt.compareSync(req.body.password, users[user].password)){
                        userWhenLoggingIn = users[user];
                        break;
                    }
                }
            }
            
            if (userWhenLoggingIn == undefined){
            
            res.render("login.ejs", { errors : [
           
                       {msg: 'La contraseña o el correo no coinciden'}
                    ]
                });
            }
            
            req.session.userLoggedIn = userWhenLoggingIn;
            res.render(`user`, { user: userWhenLoggingIn });
            

            /* console.log(req.session.userLoggedIn) */
        }else{
            return res.render("login.ejs", { errors });
        }

    },

    // (GET) Registro Estatico
    register: (req, res) => {
        res.render("register")
    },
    
    // (POST) Proceso Registro
    processToRegister: (req, res) => {

        const errores = validationResult(req);  //--->Traemos las validaciones
        // console.log(errores);

        if(!errores.isEmpty()){ //-->Si existen errores, se renderizan y además se renderizan los input de usuario que sean correctos en el objeto 'old' 
            console.log("Errores: ", errores);
            return res.render("register", { errores: errores.array(), old: req.body}) 
        }else{
            res.render("register")
            
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

		res.redirect('/users/userProfile/')  //--> Se redirige al perfil del usuario
    },

    // (GET) Editar Estatico
    preference: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

		const usersToEdit = usersJson.find((users) => {

			return users.id == req.params.id;

		}) 

		res.render("editarUsuario", {usersToEdit})
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
		res.redirect("/users/userProfile/" + usersToEdit.id)
    }

}

module.exports = usersControllers;