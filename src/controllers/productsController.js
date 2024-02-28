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
			let products = await db.Productos.findByPk(req.params.id/* , {
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
			  } */)
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
		try{	//---TODOS LOS DATOS QUE SE AGREGUEN DE TABLAS SECUNDARIAS TIENEN QUE SER SELECCIONANDO LOS VALORES DE ESAS TABLAS, CON OPCIONES---//
			
			let product_brand= await db.Marcas.findAll({
				where: {
					brand_name: req.body.brand
				}
			});
			/* let product_color= await db.Colores.findAll({
				where: {
					color_name: req.body.color
				}
			}); */
			let product_color= await db.Colores.findAll();
			let product_category= await db.Categorias.findAll({
				where: {
					color_name: req.body.category
				}
			});
			let product_state= await db.Estado.findAll({
				where: {
					color_name: req.body.state
				}
			})

			console.log("product_brand: ",product_brand);
			console.log("product_brand ID: ",product_brand[0]['dataValues'].id);
			console.log("product_color: ",product_color);
			/* console.log("product_color ID: ",product_color[0]['dataValues'].id); */	

			
			let products = await db.Productos.create({
				image: req.file == undefined ? "IMG_DEFAULT.svg": req.file.filename,
				brand_id: req.body.brand == undefined ? "Sin Asignar": product_brand[0]['dataValues'].id, 
				name: req.body.name == undefined ? "Sin Asignar" : req.body.name,
				price: req.body.price == undefined ? 0 : req.body.price,
				discount: req.body.discount == undefined ? 0 : req.body.discount,
				description: req.body.description == undefined ? "Sin Asignar" : req.body.description,
				quantity: req.body.quantity == undefined ? 0 : req.body.quantity,
				/* color_id: req.body.color == undefined ? "Sin Asignar" : product_color[0]['dataValues'].id,   
				category_id: req.body.category == undefined ? "Sin Asignar" : product_category[0]['dataValues'].id,  
				state_id: req.body.state == undefined ? "Sin Asignar" : product_state[0]['dataValues'].id    */
			})

			res.redirect('../admin/allTheProducts')
		} 
		catch(err) {
			console.log(err);
			res.render("not-found")
		}
	},

	// (get) Update - Formulario para editar
	edit: async (req, res) => {
		try {
			let products = await db.Productos.findByPk(req.params.id,{
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
