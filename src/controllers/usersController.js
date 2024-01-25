const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const bcrypt = require("bcryptjs")

const { validationResult } = require("express-validator")

/* En la constante "users" ya tienen los usuarios que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const usersFilePath = path.join(__dirname, "../data/usersDataBase.json");

//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersControllers = {
    detailUser: (req, res) => {
        /* const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        let userId = req.params.id

		let userDefinido = usersJson.find(element => {
			return element.id == userId
		})

		if(userDefinido){
			res.render("users", { singleProduct : userDefinido })
		} else{
            res.send("ERROR")
		} */
        res.render("users")
    },

    login: (req, res) => {
        res.render("login");
    },

    processToLogin: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    },

    register: (req, res) => {

        let errores = validationResult(req);

        if(errores.isEmpty()){
            res.render("register")
        }else{
            return res.render("register", { mensajesDeError: errores.mapped(), old: req.body})
        }

    },

    processToCreate: (req, res) => {
        const usersJson = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const passwordToValidate = req.body.password

        newUser = {
            userId: usersJson[usersJson.length - 1].id + 1,
			name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(passwordToValidate, 10),
            imgProfile: req.file == undefined ? "usuario-al-azar.png" : req.file.filename
        }

        usersJson.push(newUser);

		fs.writeFileSync(usersFilePath, JSON.stringify(usersJson, null, ' '));

		res.redirect('/users/userProfile')
    }
    
}


module.exports = usersControllers;