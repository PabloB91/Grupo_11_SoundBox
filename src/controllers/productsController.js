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
		// Do the magic
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render("todosLosProductos", { products });
	},

	// (get) Detail - Detalle de un producto
	detail: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let idProducto = req.params.id

		let productoDefinido = products.find(producto => {
			return producto.id == idProducto
		})
				if(productoDefinido){
					res.render("productDetail", { singleProduct : productoDefinido })
				} else{
					res.send("ERROR")
				}
	

	},

	

	// (get) Create - Formulario para crear
	create: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("crearProducto", { products });

    },

	// (post) Create - Método para guardar la info
	processCreate: (req, res) => {

		//Gusrdar el producto con la informacion del usuario

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const newProduct = {
			id: products[products.length - 1].id + 1,
			imagen: req.file.filename,
			imagenimagenFrontal: req.file.filename,
			imagenLateralDerecha: req.file.filename,
			imagenLateralIzquierda: req.file.filename,
			nombre: req.body.nombre,
			marca: req.body.marca,
			precio: req.body.precio,
			descuento: req.body.descuento,
			descripcion: req.body.descripcion,
			cantidad: req.body.cantidad,
			coloresDisponibes: req.body.color,
			categoria: req.body.categoria
		}

		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		// mostrar lo que se guardo en una vista

		res.redirect('/admin')
	},

	// (get) Update - Formulario para editar
	edit: (req, res) => {
		// Do the magic

		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const productToEdit = products.find(product => {
			return product.id == req.params.id
		})

		res.render("product-edit-form", { productToEdit });
	},
	// (post) Update - Método para actualizar la info
	processEdit: (req, res) => {
		// Do the magic
		// Leemos el json
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// buscamos el producto que tenemos que editar
		const id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

		// Creamos el producto "nuevo" que va a reemplazar al anterior
		productToEdit = {
			id: productToEdit.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: productToEdit.image
		}

		// Buscamos la posicion del producto a editar
		let indice = products.findIndex(product => {
			return product.id == id
		})
		// Reemplazamos
		products[indice] = productToEdit;

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
		res.redirect("/")
	},

	// (delete) Delete - Eliminar un producto de la DB
	destroy: (req, res) => {
		// Do the magic
		let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        // eliminar
        products = products.filter(product =>{

            return product.id != req.params.id;

        });

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

        res.redirect("/");

	}

};

module.exports = controller;