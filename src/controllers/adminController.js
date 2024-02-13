/* const express = require('express');
const path = require("path");
const fs = require('fs');
const db = require("../database/models")


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

const aController = {
    
    listUsers :(req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        res.render("user/usersList.ejs", {users});
    }
}
module.exports = aController; */ 




const express = require('express');
const path = require("path");
const fs = require('fs');
const db = require("../database/models")

const adminController = {
    listUsers: async (req, res) => {
        try {
            let users = await db.Usuarios.findAll()
            res.render("user/usersList.ejs", { users });
        }
        catch(err) {
            console.log(err);
			res.render("not-found")
		}
    }
}
module.exports = adminController;
