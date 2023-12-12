// Acá nos falta nuestra fuente de datos
const path = require("path")
const express = require("express")
const app = express();
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
        // const listaObjetos = "conjunto de datos";
        // const datos2 = ["dato1", "dato2", "dato3", "dato4"];

        res.render("index", { instrumentos: todosLosInstrumentos }
            // , {listaObjetos: listaObjetos}
        );

    },



    // administrador: (req, res) => {
    //     res.render("crearProducto", { instrumentos: todosLosInstrumentos })
        
    // },

    carrito: (req, res) => {

        res.render("productCart",
            { instrumentos: todosLosInstrumentos }
            // { productos }
        );

    },

    login: (req, res) => {

        res.render("login");

    },

    register: (req, res) => {

        res.render("register");

    },

    productDetail: (req, res) => {

        res.render("productDetail");

    },

}



// Acá exportamos el resultado
module.exports = mainController;