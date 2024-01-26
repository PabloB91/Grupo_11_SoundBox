const express = require('express')
const path = require("path")
const fs = require('fs')

const usersFilePath = path.join(__dirname, '../data/users.json')

const aController = {
    
    listUsers :(req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        res.render("listUsers.ejs", {users})
    }
}
module.exports = aController;