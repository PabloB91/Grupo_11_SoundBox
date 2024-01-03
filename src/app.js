//*****************************************************************************************************\\

const express = require("express");
const path = require("path")
const fs = require("fs");
<<<<<<< HEAD
// const methodOverride = require('method-override'); // Para poder usar los métodos PUT y DELETE
const logMiddleware = require("./middlewares/logMiddleware");


app.use(express.static("public"));
// Middlewares
app.use(logMiddleware);
=======
const methodOverride = require('method-override'); // requiriendo method para usar put y delate
// const logMiddleware = require("./middlewares/logMiddleware");

const app = express();
>>>>>>> 9807b06ec7d448a407d275068dc5a7299f1a2ba2

//*****************************************************************************************************\\

/************* Middlewares *************/
app.use(express.static("public")); // para usar los archivos estaticos de la carpeta public

// Para tomar los datos del body
app.use(express.urlencoded({extended: false}));
app.use(express.json()) 

// Para poder usar los metodos put y delete
app.use(methodOverride('_method'));
// app.use(logMiddleware);

//*****************************************************************************************************\\

/************* Template engine (ejs) *************/

app.set("view engine", "ejs")
app.set('views', path.resolve(__dirname, "views"));

//*****************************************************************************************************\\
// ** Rutas **

// index
const mainRouter = require("./routes/mainRouter");

// products
const productsRouter = require('./routes/productsRouter'); 

app.use("/", mainRouter);
app.use("/products", productsRouter);

<<<<<<< HEAD

=======
// 404, si no esta la ruta buscada arrojaria este error
>>>>>>> 9807b06ec7d448a407d275068dc5a7299f1a2ba2
app.use((req, res, next) => {
    res.status(404).render("not-found")
    next()
});

<<<<<<< HEAD
app.listen(3050,()=> {
    console.log ("Servidor funcionando en: http://localhost:3050/")
});
=======
//*****************************************************************************************************\\

/************* LLAMANDO AL SERVIDOR *************/
const port = process.env.PORT || 3050;

app.listen(3050,()=> {
    console.log (`Servidor funcionando en: http://localhost:${port}`)
});
//*****************************************************************************************************\\
>>>>>>> 9807b06ec7d448a407d275068dc5a7299f1a2ba2
