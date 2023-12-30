// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const { log } = require("console");

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const mainController = {
    
    index: (req, res) => {
        
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const masVendidos = products.filter(product => product.cantidad <= 10 )
        //console.log("masvendidos: ", masVendidos);
        const ofertas =  products.filter(product => product.descuento != 0 ) 
        // console.log(ofertas);
        res.render("index", {masVendidos :masVendidos}, 
        );.0
    
    },

    categorias: (req, res) =>{
        const products= JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //console.log(req.params.nombre);
        
        const productCategory= products.filter(product => product.categoria === req.params.nombre)
        //console.log(productCategory)
        res.render("categoria", {productos: productCategory})

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