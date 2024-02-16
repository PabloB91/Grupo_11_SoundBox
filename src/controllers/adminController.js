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
    },
    allProducts: async (req, res) => {
        try {
            let products = await db.Productos.findAll();

            res.render("product/allTheProducts.ejs", { products })
        }
        catch(err) {
			res.render("not-found")
		}

    }
}
module.exports = adminController;
