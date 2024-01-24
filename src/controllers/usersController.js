const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");

/* En la constante "users" ya tienen los usuarios que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
    //--> Crear métodos
}


module.exports = controller;