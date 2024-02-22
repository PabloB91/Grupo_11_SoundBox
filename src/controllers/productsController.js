const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const db = require("../database/models")

const { log } = require("console");

const controller = {

	// (get) Detail - Detalle de un producto
	detail: async (req, res) => {
		try {
			let products = await db.Productos.findByPk(req.params.id, {
				include: [
					{
					  model: db.Color,
					  attributes: ['color_name']
					},
					{
					  model: db.State,
					  attributes: ['state']
					},
					{
					  model: db.Category,
					  attributes: ['category']
					},
					{
					  model: db.Brand,
					  attributes: ['brand_name']
					}
				  ]
			  })
			res.render("product/productDetail", { products })
		}
		catch(err) {
			res.render("not-found")
		}
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {
			res.render("product/productCreate")
    },

	// (post) Create - Método para guardar la info
	processCreate: async (req, res) => {
		try{
			let products = await db.Productos.create({
				image: req.file == undefined ? "IMG_DEFAULT.svg": req.file.filename,
				brand: req.body.brand == undefined ? "Sin Asignar": req.body.brand,
				name: req.body.name == undefined ? "Sin Asignar" : req.body.name,
				price: req.body.price == undefined ? 0 : req.body.price,
				discount: req.body.discount == undefined ? 0 : req.body.discount,
				description: req.body.description == undefined ? "Sin Asignar" : req.body.description,
				quantity: req.body.quantity == undefined ? 0 : req.body.quantity,
				color: req.body.color == undefined ? "Sin Asignar" : req.body.color,
				category: req.body.category == undefined ? "Sin Asignar" : req.body.category,
				state: req.body.state == undefined ? "Sin Asignar" : req.body.state
			})  
			res.render("product/allTheProducts.ejs", { products })
		} 
		catch(err) {
			res.render("not-found")
		}
	},

	// (get) Update - Formulario para editar
	edit: async (req, res) => {
		try {
			let products = db.Productos.findByPk(req.params.id,{
				include: [
					{association: "brand"}, 
					{association: "category"},
					{association: "color"},
					{association: "state"}
				]
			})
			res.render("product/productEdit", { products })
		}
		catch(err) {
			res.render("not-found")
		}
	},

	// (post) Update - Método para actualizar la info
	processEdit: async (req, res) => {
		try {
			let products = await db.Productos.update({
				image: req.file == undefined ? "IMG_DEFAULT.svg": req.file.filename,
				brand: req.body.brand,
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				description: req.body.description,
				quantity: req.body.quantity,
				color: req.body.color,
				category: req.body.category,
				state: req.body.state
			}, {
				where: {
					id: req.params.id
				}
			})
			res.redirect("product/productDetail/" + req.params.id)
		}
		catch(err) {
			res.render("not-found")
		}
	},

	// (delete) Delete - Eliminar un producto de la DB
	destroy: async (req, res) => {
		try {
			let products = await db.Productos.destroy({
				where: {
					id: req.params.id
				}
			})
			res.redirect("/")
		}
		catch(err) {
			res.render("not-found")
		}
	}
};

module.exports = controller;
