//*****************************************************************************************************\\

const express = require("express");
const path = require("path")
const fs = require("fs");
const methodOverride = require('method-override'); // requiriendo method para usar put y delate
const logMiddleware = require("./middlewares/logMiddleware");

const app = express();

//*****************************************************************************************************\\

/************* Middlewares *************/
app.use(express.static("public")); // para usar los archivos estaticos de la carpeta public

// Para tomar los datos del body
app.use(express.urlencoded({extended: false}));
app.use(express.json()) 

// Para poder usar los metodos put y delete
app.use(methodOverride('_method'));

//*****************************************************************************************************\\
                                                // MIDDLEWARES
app.use(logMiddleware);

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

// 404, si no esta la ruta buscada arrojaria este error
app.use((req, res, next) => {
    res.status(404).render("not-found")
    next()
});

//*****************************************************************************************************\\

/************* LLAMANDO AL SERVIDOR *************/
const port = process.env.PORT || 3050;

app.listen(3050,()=> {
    console.log (`Servidor funcionando en: http://localhost:${port}`)
});
//*****************************************************************************************************\\

