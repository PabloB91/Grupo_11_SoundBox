//*****************************************************************************************************\\

const express = require("express");
const path = require("path")
const app = express();
const fs = require("fs");
const methodOverride = require('method-override'); // requiriendo method para usar put y delate
// const logMiddleware = require("./middlewares/logMiddleware");

//*****************************************************************************************************\\

app.use(express.static("public")); // para usar los archivos estaticos de la carpeta public

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

app.use((req, res, next) => {
    res.status(404).render("not-found")
});

//*****************************************************************************************************\\

/************* Middlewares *************/

// Para tomar los datos del body
app.use(express.urlencoded({extended: false}));
app.use(express.json) 

// Para poder usar los metodos put y delete
app.use(methodOverride('_method'));
// app.use(logMiddleware);


//*****************************************************************************************************\\

/************* LLAMANDO AL SERVIDOR *************/
app.listen(3050,()=> {
    console.log ("Servidor funcionando en: http://localhost:3050/")
});
//*****************************************************************************************************\\
