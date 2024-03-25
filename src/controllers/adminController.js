const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../database/models");

const adminController = {
	listUsers: async (req, res) => {
		try {
			let users = await db.Usuarios.findAll({
				include: [
					{ association: "user_type" },
					{ association: "country" },
				],
			});

			let user_image = "/img/users/default-image/javier.jpg";

			let full_user = { users: users, user_image: user_image }; //--> Se guardan por un lado los datos y por otro la imagen

			res.render("user/usersList.ejs", { full_user });
		} catch (err) {
			/* console.log(err); */
			res.render("errors/404.ejs");
		}
	},
	allProducts: async (req, res) => {
		try {
			let products = await db.Productos.findAll({
				include: [
					{ association: "brand", attributes: ["brand_name"] },
					{ association: "category" },
					{ association: "state" },
					{
						model: db.Colores,
						attributes: ["color_name"], // Vamos a buscar los colores a través de la relación entre tablas// Aquí especificamos que solo queremos el nombre de los colores
					},
				],
			});
			//--> Todos estos console log son para entender cómo vienen los datos

			/* console.log("products: ",products[3]['dataValues']);
            console.log("iterar el datavalues");
            console.log(products[3]['dataValues'].Colores[0]['dataValues']);
            const colorName = products[3]['dataValues'].Colores[0]['dataValues'].color_name;
            console.log("Color Name: ", colorName);
            console.log("products: ",products.length); */

			res.render("product/allTheProducts.ejs", { products });
		} catch (err) {
			/* console.log(err); */
			res.render("errors/404.ejs");
		}
	},
};
module.exports = adminController;
