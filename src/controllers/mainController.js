// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const { log } = require("console");
const { validationResult } = require("express-validator")



/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

const mainController = {

    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const lastSeen= products.filter(product => product.precio <= 2500)
        //console.log("masvendidos: ", masVendidos);
        const ofertas = products.filter(product => product.descuento != 0)
        // console.log(ofertas);
        res.render("index", { lastSeen: lastSeen, products : products},
        ); 

    },

    admin: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("admin.ejs", {users, products});
    },

    allProducts: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // console.log(products)
        res.render("product/allTheProducts.ejs", { products })

    },

    categories: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //console.log(req.params.nombre);

        const productCategory = products.filter(product => product.categories === req.params.nombre)
        //console.log(productCategory)
        res.render("product/categories.ejs", { productos: productCategory })

    },
    
    carrito: (req, res) => {

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //console.log(req.params.nombre);

        // const productCart = products.filter( !!! HACER EL FILTRO DE PRODUCTOS PARA EL CARRITO !!! );

        // console.log(productCart) 
        res.render("product/productCart.ejs", { productos: products });

    },

    contactUs: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //console.log(req.params.nombre);

        const productCategory = products.filter(product => product.categories === req.params.nombre)
        //console.log(productCategory)
        res.render("contactUs.ejs", { productos: productCategory })

    },

}

// Acá exportamos el resultado
module.exports = mainController;


/* 
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
const db = require("../database/models");
const { Op } = require("sequelize");

const { log } = require("console");
const { validationResult } = require("express-validator")


const mainController = {
    index: async (req, res) => {
        try {
            let topSeller = db.Productos.findAll({
                where: {
                   price: {
                    [Op.gt]: 2500
                   } 
                }
            })
            let  offerts = await db.Productos.findAll({
                where: {
                    descuento: {
                        [Op.ne]: 0 
                    }
                }
            })
            res.render("index", { topSeller : topSeller})
        }
        catch(err) {
            res.render("not-found")
        }

    },

    admin: async (req, res) => {
        try {
            let users = await db.Usuarios.findAll();
            let products = await db.Productos.findAll();

            res.render("admin.ejs", {users, products})
        }
        catch(err) {
			res.render("not-found")
		}

    },

    allProducts: async (req, res) => {
        try {
            let products = await db.Productos.findAll({
                include: [
					{association: "brand"}, 
					{association: "category"},
					{association: "color"},
					{association: "state"}
				]
            });

            res.render("product/allTheProducts.ejs", { products })
        }
        catch(err) {
			res.render("not-found")
		}

    },

    categories: async (req, res) => {
        try {
            let products = await db.Productos.findByPk({
                include: [{association: "category"}],
                where: {
                    name: req.params.nombre
                }
            })
            res.render("product/categories.ejs", { products })
        }
        catch(err) {
			res.render("not-found")
		}

    },
    
    carrito: async (req, res) => {
        try {
            let products = await db.Productos.findAll();

            res.render("product/productCart.ejs", { products });
        }
        catch(err) {
			res.render("not-found")
		}
    }

}
module.exports = mainController;
*/