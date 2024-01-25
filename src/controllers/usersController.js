const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const bcrypt = require("bcryptjs")

const { validationResult } = require("express-validator")

/* En la constante "users" ya tienen los usuarios que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersControllers = {
    index: (req, res) => {

        res.render("index"); 

    },
    detailUser: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const userId = req.params.id
		const UserDefinido = users.find(element => {
            return element.id == userId
		})
        
		if(UserDefinido){
            res.render("users", { singleUsers : UserDefinido })
		} else{
            res.send("ERROR")
		}
    },

    login: (req, res) => {
        res.render("login");
    },

    processToLogin: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
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
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const passwordToValidate = req.body.password

        newUser = {
            userId: users[users.length - 1].id + 1,
			name: req.boy.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(passwordToValidate, 10),
            imgProfile: req.file.filename
        }

        products.push(newUser);

		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));

		res.redirect('')
    }
    
}


module.exports = usersControllers;