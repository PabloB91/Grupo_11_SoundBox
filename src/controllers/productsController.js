const fs = require('fs');
const path = require('path');

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
		// Do the magic

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const singleProduct = products.find(product => {
			return product.id == req.params.id
		})

		res.render("productDetail", { singleProduct });
	},

	// (get) Create - Formulario para crear
	create: (req, res) => {
		// Do the magic
		res.render("crearProducto");
	},

	// (post) Create - Método para guardar la info
	processCreate: (req, res) => {

		// do the magic
		// res.send("HEllO WORLD");	
		
		// req.body
		console.log((req.body));

		//Gusrdar el producto con la informacion del usuario

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const newProduct = {
			id: products[products.length - 1].id + 1,
			imagen: "./img/products/IMG_DEFAULT.svg",
			imagenFrontal: "./img/products/IMG_DEFAULT.svg",
			imagenLateralIzquierdo: "./img/products/IMG_DEFAULT.svg",
			imagenLateralDerecho: "./img/products/IMG_DEFAULT.svg",
			nombre: req.body.nombre,
			marca: req.body.marca,
			precio: req.body.precio,
			descuento: req.body.descuento,
			descripcion: req.body.descripcion,
			cantidad: req.body.cantidad,
			coloresDisponibes: req.body.color,
			categorias: req.body.categorias
		}

		products.push(newProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		// mostrar lo que se guardo en una vista

		res.redirect("/products")
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
		products = products.filter(product => {
			return product.id != req.params.id
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		res.redirect("/");
	}
};

module.exports = controller;