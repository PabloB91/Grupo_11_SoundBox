// Acá nos falta nuestra fuente de datos
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const db = require("../database/models");

const { log } = require("console");
const { validationResult } = require("express-validator");
const { Op, where } = require("sequelize");

const mainController = {
	index: async (req, res) => {
		try {
			const topSeller = await db.Productos.findAll({
				where: {
					price: {
						[Op.gt]: 1500,
					},
				},
				limit: 10,
			});
			const newsComments = await db.Productos.findAll({
				where: {
					price: {
						[Op.gt]: 1500,
					},
				},
				limit: 3,
			});
			const newsAdd = await db.Productos.findAll({
				where: {
					price: {
						[Op.gt]: 1500,
					},
				},
				limit: 3,
			});
			const offerts = await db.Productos.findAll({
				where: {
					discount: {
						[Op.ne]: 0,
					},
				},
			});
			const products = await db.Productos.findAll();

			res.render("index", { topSeller, offerts, products, newsComments,newsAdd });
		} catch (err) {
			/* console.log(err); */
			res.render("errors/404.ejs");
		}
	},

	admin: async (req, res) => {
		try {
			const users = await db.Usuarios.findAll();
			const products = await db.Productos.findAll();
			res.render("admin.ejs", { users, products });
		} catch (err) {
			/* console.log(err); */
			res.render("errors/404.ejs");
		}
	},

	categories: async (req, res) => {
		try {
			const category = await db.Productos.findByPk({
				where: {
					category: { name: req.params.nombre },
				},
				include: [{ association: "category" }],
			});
			res.render("product/categories.ejs", { category });
		} catch (err) {
			c;
			res.render("errors/404.ejs");
		}
	},

	allCategories: async (req, res) => {
		try {
			res.render("product/allCategories.ejs");
		} catch (err) {
			c;
			res.render("errors/404.ejs");
		}
	},

	carrito: async (req, res) => {
		try {
			const products = await db.Productos.findAll();

			res.render("product/productCart.ejs", { products });
		} catch (err) {
			/* console.log(err); */
			res.render("errors/404.ejs");
		}
	},
};

module.exports = mainController;
