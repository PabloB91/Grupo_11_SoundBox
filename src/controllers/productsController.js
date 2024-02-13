const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const { log } = require("console");
/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const controller = {
	// (get) Root - Mostrar todos los productos
	index: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render("product/allTheProducts.ejs", { products });
	},

	// (get) Detail - Detalle de un producto
	detail: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let idProducto = req.params.id

		let productoDefinido = products.find(producto => {
			return producto.id == idProducto
		})

		if(productoDefinido){
			res.render("product/productDetail", { singleProduct : productoDefinido })
		} else{
			res.send("ERROR")
		}
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("product/productCreate", { products });

    },

	// (post) Create - Método para guardar la info
	processCreate: (req, res) => {
		//console.log(req.file.filename);
		//Gusrdar el producto con la informacion del usuario
		
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		/* console.log(req.files[0]["filename"]);
		console.log(req.files[1]); */
		

		const newProduct = {
			id: products[products.length - 1].id + 1,
			imagen: req.files[0] == undefined ? "IMG_DEFAULT.svg": req.files[0]["filename"],
			imagenFrontal: req.files[1] == undefined ? "IMG_DEFAULT.svg": req.files[1]["filename"],
			imagenLateralDerecha: req.files[2] == undefined ? "IMG_DEFAULT.svg": req.files[2]["filename"],
			imagenLateralIzquierda: req.files[3]== undefined ? "IMG_DEFAULT.svg": req.files[3]["filename"],   
			marca: req.body.marca == undefined ? "": req.body.marca,
			nombre: req.body.nombre == undefined ? "": req.body.nombre,
			precio: req.body.precio == undefined ? "": parseInt(req.body.precio),
			descuento: req.body.descuento == undefined ? "": parseInt(req.body.descuento),
			descripcion: req.body.descripcion == undefined ? "": req.body.descripcion,
			cantidad: req.body.cantidad == undefined ? "": parseInt(req.body.cantidad),
			coloresDisponibles: req.body.coloresDisponibles == undefined ? [""]: req.body.coloresDisponibles.split(',').map(color => color.trim()),
			categories: req.body.categories == undefined ? "": req.body.categories.split(',').map(category => category.trim()),
			estado: req.body.estado == undefined ? "": req.body.estado
		}

		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		// mostrar lo que se guardo en una vista

		res.redirect('product/allTheProducts.ejs')
	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const productToEdit = products.find((product) => {

			return product.id == req.params.id;

		}) 

		res.render("product/productEdit.ejs", {productToEdit})
	},
	// (post) Update - Método para actualizar la info
	processEdit: (req, res) => {

		// Leemos el json
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// buscamos el producto que tenemos que editar
		const id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

		// Creamos el producto "nuevo" que va a reemplazar al anterior

		productToEdit = {
			id: productToEdit.id,
			imagen: req.files == [] ? productToEdit.imagen : req.files[0]["filename"],
			//imagenFrontal: req.files == [] ? productToEdit.imagenFrontal : req.files[1]["filename"],
			//imagenLateralDerecha: req.files == [] ? productToEdit.imagenLateralDerecha : req.files[2]["filename"],
			//imagenLateralIzquierda: req.files == [] ? productToEdit.imagenLateralIzquierda : req.files[3]["filename"],
			marca: req.body.marca,
			nombre: req.body.nombre,
			precio: req.body.precio,
			descuento: req.body.descuento,
			descripcion: req.body.descripcion,
			cantidad: req.body.cantidad,
			coloresDisponibles: req.body.coloresDisponibles.split(',').map(color => color.trim()),
			categories: req.body.categories.split(',').map(category => category.trim()),
			estado: req.body.estado
		}

		// Buscamos la posicion del producto a editar
		let indice = products.findIndex(product => {
			return product.id == id
		})
		// Reemplazamos
		products[indice] = productToEdit;

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("product/productDetail.ejs" + productToEdit.id)
	},

	// (delete) Delete - Eliminar un producto de la DB
	destroy: (req, res) => {

		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// eliminar
		products = products.filter(product =>{
			
			return product.id != req.params.id;

		})

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))

		res.redirect("/")
	}

};

module.exports = controller;



/* 
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const db = require("../database/models")

const { log } = require("console");

const controller = {
	// (get) Root - Mostrar todos los productos
	index: async (req, res) => {
		try {
			let products = await db.Productos.findAll({
				include: [
					{association: "brand"}, 
					{association: "category"},
					{association: "color"},
					{association: "state"}
				]
			})
			res.render("product/allTheProducts.ejs", { products });
		}
		catch(err) {
			res.render("not-found")
		}
	},

	// (get) Detail - Detalle de un producto
	detail: async (req, res) => {
		try {
			let products = await db.Productos.findByPk({
				include: [
					{association: "brand"}, 
					{association: "category"},
					{association: "color"},
					{association: "state"}
				],
				where: {
					id: req.params.id
				}
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
			let products = db.Productos.findByPk({
				include: [
					{association: "brand"}, 
					{association: "category"},
					{association: "color"},
					{association: "state"}
				],
				where: {
					id: req.params.id
				}
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
*/