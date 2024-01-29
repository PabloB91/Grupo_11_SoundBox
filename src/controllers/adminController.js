const express = require('express');
const path = require("path");
const fs = require('fs');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

const aController = {
    
    listUsers :(req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        res.render("user/usersList.ejs", {users});
    }
}
module.exports = aController;