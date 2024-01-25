const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");

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

        const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
        const userId = req.params.id
		const UserDefinido = usersFilePath.find(user => {
            return user.id == userId
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

    }
    
}


module.exports = usersControllers;