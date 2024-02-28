const express = require('express');
const path = require("path");
const fs = require('fs');
const db = require("../database/models")

const adminController = {
    listUsers: async (req, res) => {
        try {
            let users = await db.Usuarios.findAll(/* {
                limit: 5
            } */)

            let user_image= '/img/users/default-image/javier.jpg'

            let full_user= {'users': users, 'user_image': user_image}



            /* console.log(users); */
            res.render("user/usersList.ejs", { full_user });
        }
        catch(err) {
            console.log(err);
			res.render("not-found")
		}
    },
    allProducts: async (req, res) => {
        try {
            let products = await db.Productos.findAll();
            console.log("products: ",products.length);
            res.render("product/allTheProducts.ejs", { products })
        }
        catch(err) {
            console.log(err);
			res.render("not-found")
		}

    }
}
module.exports = adminController;
