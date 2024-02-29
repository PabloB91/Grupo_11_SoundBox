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
			let product = await db.Productos.findByPk(req.params.id , {
				include: [
					{model: db.Colores, attributes: ['color_name']}, // Vamos a buscar los colores a través de la relación entre tablas, especificando que solo queremos el nombre de los colores
					{association: "state"},
					{association: "category"},
					{association: "brand", attributes: ['brand_name']},
				  ]
			  })
			res.render("product/productDetail", { product })
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
		try{	//---A FUTURO, TODOS LOS DATOS QUE SE AGREGUEN DE TABLAS SECUNDARIAS TIENEN QUE SER SELECCIONANDO LOS VALORES DE ESAS TABLAS, CON OPCIONES---//
				//--PARA EVITAR ERRORES EN LOS INPUT--//
			let product_brand= await db.Marcas.findOne({
				where: {
					brand_name: req.body.brand		//--> Se buscan todos los atributos de la marca ingresada por el usuario
				}
			});
			let colors = req.body.colors;		//--> Se asignan los colores elegidos por el usuario a la variable 'colors'
			
			let product_category= await db.Categorias.findOne({
				where: {
					category: req.body.category //--> Se buscan todos los atributos de la categoría ingresada por el usuario
				}
			}) 
			let product_state= await db.Estado.findOne({
				where: {
					state: req.body.state //--> Se buscan todos los atributos del estado ingresad por el usuario
				}
			}) 

			let new_product = await db.Productos.create({
				image: req.file == undefined ? "IMG_DEFAULT.svg": req.file.filename,
				brand_id: req.body.brand == undefined ? "Sin Asignar": product_brand.id, 	//--> Se asigna un valor default o el Id de la marca seleccionada
				name: req.body.name == undefined ? "Sin Asignar" : req.body.name,
				price: req.body.price == undefined ? 0 : req.body.price,
				discount: req.body.discount == undefined ? 0 : req.body.discount,
				description: req.body.description == undefined ? "Sin Asignar" : req.body.description,
				quantity: req.body.quantity == undefined ? 0 : req.body.quantity,
				category_id: req.body.category == undefined ? "Sin Asignar" : product_category.id,   //--> Se asigna un valor default o el Id de la categoría seleccionada
				state_id: req.body.state == undefined ? "Sin Asignar" : product_state.id    	//--> Se asigna un valor default o el Id del estado seleccionado
			});
			//--> Hasta acá ya se creó el nuevo producto

			//--> Acá se le asignan los colores al nuevo producto
			// Para cada color seleccionado, crea una entrada en ProductosColores (tabla intermedia que permite la relación muchos a muchos)
			for (let colorId of colors) {
				await db.ProductosColores.create({
					product_id: new_product.id, 	//--> Se asigna el product Id en la tabla intermedia según el product Id del producto recién creado
					color_id: colorId	//--> Se asigna el Id del o de los colores seleccionados por el usuario
				});
			}
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
			let productToEdit = await db.Productos.findByPk(req.params.id,{
				include: [
					{association: "brand", attributes: ['brand_name']}, 
					{association: "category"},
					{association: "state"},
					{model: db.Colores, attributes: ['color_name']} // Vamos a buscar los colores a través de la relación entre tablas, especificando que solo queremos el nombre de los colores
				]
			})
			let availableStates= await db.Estado.findAll() //--> Traemos todos los estados disponibles, para poder comparar con el que tiene el producto actualmente
			
			res.render("product/productEdit", { productToEdit, availableStates })
		}
		catch(err) {
			console.log(err);
			res.render("not-found")
		}
	},

	// (post) Update - Método para actualizar la info
	processEdit: async (req, res) => {
		try {
			let editedProduct = await db.Productos.update({
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
	},

	search: async (req, res) => {
		try {
			let products = await db.Productos.findAll()
			res.render("product/search", { products })
		}
		catch(err) {
			res.render("not-found")
		}
	}
};

module.exports = controller;
