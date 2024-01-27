const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const bcrypt = require("bcryptjs")

const { validationResult } = require("express-validator");
const { log } = require("console");

/* En la constante "users" ya tienen los usuarios que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");

const usersControllers = {
    
    user: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        // console.log(usersJson)
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

    login: (req, res) => {
        res.render("login.ejs");
    },

    processToLogin: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    },

    register: (req, res) => {
        res.render("register")
            },

    processToCreate: (req, res) => {

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
            imgProfile: req.file == undefined ? "usuario-al-azar.png" : req.file.filename
        }
        
        usersJson.push(newUser);  //--> Se agrega el nuevo usuario a la variable del JSON

		fs.writeFileSync(usersFilePath, JSON.stringify(usersJson, null, ' '));  //--> Se escribe el archivo JSON con la variable modificada

		res.redirect('/users/userProfile')  //--> Se redirige al perfil del usuario

    },
    
    store: function( req, res ) {
        const errores = validationResult(req);  //--->Traemos las validaciones
        // console.log(errores);


    }

}

module.exports = usersControllers;