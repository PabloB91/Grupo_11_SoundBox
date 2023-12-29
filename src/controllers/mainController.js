// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs")

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

// Acá nos falta un objeto literal con las acciones para cada ruta

const mainController = {
    
    index: (req, res) => {
        
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const visitedProducts = products.filter(products =>{
            return products.category == "visited"
        })
        res.render("index", {visitedProducts}, 
            //listaObjetos
        );
        
    },

    // formularios
    login: (req, res) => {
        
        res.render("login");
        
    },
    
    register: (req, res) => {
        
        res.render("register");
        
    },
    
    // aca ponemos los que necesitan los productos->
    crear: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        res.render("crearProducto", {products});
        
    },
    
    carrito: (req, res) => {
        
        res.render("productCart", { instrumentos: todosLosInstrumentos }
        // { productos }
        );
        
    },
    
    productDetail: (req, res) => {
        
        res.render("productDetail", { instrumentos: todosLosInstrumentos });
        
    },

    allProducts: (req, res) => {

        res.render("todosLosProductos", { instrumentos: todosLosInstrumentos })

    }
    
}



// Acá exportamos el resultado
module.exports = mainController;