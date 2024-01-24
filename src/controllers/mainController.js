// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const { log } = require("console");

const authMiddleware = require("../middlewares/authMiddleware");

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const mainController = {

    index: (req, res) => {

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const masVendidos = products.filter(product => product.precio <= 2500)
        //console.log("masvendidos: ", masVendidos);
        const ofertas = products.filter(product => product.descuento != 0)
        // console.log(ofertas);
        res.render("index", { masVendidos: masVendidos },
        ); 

    },

    allProducts: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // console.log(products)
        res.render("todosLosProductos", { products })

    },

    categorias: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //console.log(req.params.nombre);

        const productCategory = products.filter(product => product.categorias === req.params.nombre)
        //console.log(productCategory)
        res.render("categoria", { productos: productCategory })

    },

    // formularios
    login: (req, res) => {

        res.render("login");

    },

    register: (req, res) => {

        res.render("register");

    },

    admin: (req, res) => {          //--> Sugiero adaptar esto a 'userProfile', y que dependiendo cuál esté logueado, que renderice vista de Admin o de Usuario común
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("administrador", /* authMiddleware, */ { products });

    },
    
    carrito: (req, res) => {

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //console.log(req.params.nombre);

        // const productCart = products.filter( !!! HACER EL FILTRO DE PRODUCTOS PARA EL CARRITO !!! );

        // console.log(productCart) 
        res.render("productCart", { productos: products });

    },

}

// Acá exportamos el resultado
module.exports = mainController;