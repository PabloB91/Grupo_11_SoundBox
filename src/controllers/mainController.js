// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
// Acá nos falta un objeto literal con las acciones para cada ruta

const productPath = path.join(__dirname, "../data/database.json");

const mainController = {

    // formularios
    login: (req, res) => {

        res.render("login");
        
    },
    
    register: (req, res) => {
        
        res.render("register");
        
    },
    
    // aca ponemos los que necesitan los productos->
    crear: (req, res) => {

        const product = JSON.parse(fs.readFileSync(productPath, "utf-8"))

        const singleProduct = product.find(products => {
			return products.id == req.params.id
		})

        res.render("crearProducto", {singleProduct })

    },

    index: (req, res) => {
    
        const product = JSON.parse(fs.readFileSync(productPath, "utf-8"))

        const singleProduct = product.find(products => {
			return products.id == req.params.id
		})

        res.render("index", {singleProduct}
            //listaObjetos
        );
    
    },
    
    carrito: (req, res) => {
        
        const product = JSON.parse(fs.readFileSync(productPath, "utf-8"))

        const singleProduct = product.find(products => {
			return products.id == req.params.id
		})

        res.render("productCart", {singleProduct}
        // { productos }
        );
        
    },
    
    productDetail: (req, res) => {
        
        const product = JSON.parse(fs.readFileSync(productPath, "utf-8"))

        const singleProduct = product.find(products => {
			return products.id == req.params.id
		})

        res.render("productDetail", {singleProduct});
        
    },
    
}



// Acá exportamos el resultado
module.exports = mainController;