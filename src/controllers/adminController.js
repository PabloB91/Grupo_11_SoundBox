const express = require('express')

const aController = {

    listUsers :(req, res) => {
        res.render("listUsers.ejs")
    }
}
module.exports = aController;