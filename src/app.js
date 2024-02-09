//*****************************************************************************************************\\

const express = require("express");
const path = require("path")
const fs = require("fs");
const methodOverride = require('method-override'); // requiriendo method para usar put y delate
const logMiddleware = require("./middlewares/logMiddleware");
const remindMiddleware= require("./middlewares/remindMiddleware");
const app = express();
const session = require("express-session")
const cookieParser = require('cookie-parser'); //--> Requerimos el módulo 'cookieParser' para manejar las cookies.


//*****************************************************************************************************\\

/************* Middlewares *************/
app.use(express.static("public")); // para usar los archivos estaticos de la carpeta public

// Para tomar los datos del body
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// Para poder usar los metodos put y delete
app.use(methodOverride('_method'));

// Para guardar cookies en el cliente
app.use(cookieParser()) 

//*****************************************************************************************************\\

// MIDDLEWARES ESCRITOS POR NOSOTROS
// quedan almacenadas en un log.txt las rutas donde accede el usuario

// app.use(logMiddleware);
app.use(session({secret: "es secreto pa!", resave: false, saveUninitialized: false}))
app.use(remindMiddleware)   //--> Es imprescindible el orden de estos middleware, porque tienen un orden de ejecución.
//*****************************************************************************************************\\

/************* Template engine (ejs) *************/

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views/"));

//*****************************************************************************************************\\
// ** Rutas **

// index
const mainRouter = require("./routes/mainRouter");

// products
const productsRouter = require("./routes/productsRouter");

// user
const usersRouter = require("./routes/usersRouter");

// admin
const adminRouter = require("./routes/adminRouter");

app.use("/", mainRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// 404, si no esta la ruta buscada arrojaria este error
app.use((req, res, next) => {
    res.status(404).render("not-found")
    next()
});

//*****************************************************************************************************\\

/************* LLAMANDO AL SERVIDOR *************/
const port = process.env.PORT || 3050;

app.listen(`${port}`, () => {
    console.log(`Servidor funcionando en: http://localhost:${port}`)
});
//*****************************************************************************************************\\

