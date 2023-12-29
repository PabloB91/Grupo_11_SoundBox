// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
const fs = require("fs");
const { log } = require("console");

/* En la constante "products" ya tienen los productos que están 
guardados en la carpeta Data como Json (un array de objetos literales) */
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Acá nos falta un objeto literal con las acciones para cada ruta

const todosLosInstrumentos = [

    {
        id: 1,
        imagen: "../img/productos/guitarras/guitarra-1.jpg",
        nombre: "guitarra criolla",
        marca: "Gibson.",
        precio: 2000,
        descuento: 15,
    },
    {
        id: 2,
        imagen: "../img/productos/guitarras/guitarra-2.jpg",
        nombre: "piano",
        marca: "Gibson.",
        precio: 3000,
        descuento: 25,
    },
    {
        id: 3,
        imagen: "../img/productos/guitarras/guitarra-3.jpg",
        nombre: "bateria",
        marca: "Gibson.",
        precio: 4000,
        descuento: 35,
    },


];



const mainController = {
    
    index: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const masVendidos = products.filter(product => product.cantidad <= 10 )
        //console.log("masvendidos: ", masVendidos);
        const ofertas =  products.filter(product => product.descuento != 0 ) 
        // console.log(ofertas);
        res.render("index", {masVendidos :masVendidos}, 
        );
    
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
        res.render("crearProducto", { instrumentos: todosLosInstrumentos })
        
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