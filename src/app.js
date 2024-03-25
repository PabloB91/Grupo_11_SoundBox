//*******************************************************************************************\\
const express = require("express");
const path = require("path");
const fs = require("fs");
const methodOverride = require("method-override"); // requiriendo method para usar put y delate
const logMiddleware = require("./middlewares/logMiddleware");
const remindMiddleware = require("./middlewares/remindMiddleware");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser"); //--> Requerimos el módulo 'cookieParser' para manejar las cookies.
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

//************************************* Middlewares *************************************\\
app.use(express.static("public")); // para usar los archivos estaticos de la carpeta public

// Para tomar los datos del body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Para poder usar los metodos put y delete
app.use(methodOverride("_method"));

// Para guardar cookies en el cliente
app.use(cookieParser());

// app.use(logMiddleware);
app.use(
	session({
		secret: "es secreto pa!",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(remindMiddleware); //--> Es imprescindible el orden de estos middleware, porque tienen un orden de ejecución.
app.use(userLoggedMiddleware);

//************************************* Template Engine *************************************\\
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views/"));

//************************************* Rutas *************************************\\
// index
const mainRouter = require("./routes/mainRouter");
app.use("/", mainRouter);

// products
const productsRouter = require("./routes/productsRouter");
app.use("/products", productsRouter);

// categories: por verificar
const categoriesRouter = require("./routes/categoriesRouter");
app.use("/categories", categoriesRouter);

// user
const usersRouter = require("./routes/usersRouter");
app.use("/users", usersRouter);

// admin
const adminRouter = require("./routes/adminRouter");
app.use("/admin", adminRouter);

// brands
const brandsRouter = require("./routes/brandsRouter");
app.use("/brands", brandsRouter);

// reset-password
const resetPassword = require("./routes/mailerRouter");
app.use("/reset", resetPassword);

//************************************* Error 404 *************************************\\
app.use((req, res, next) => {
	res.status(404).render("errors/404.ejs");
	next();
});

//************************************* Listen Server *************************************\\
const port = process.env.PORT || 3020;

app.listen(`${port}`, () => {
	console.log(`Servidor funcionando en: http://localhost:${port}`);
});

//*******************************************************************************************\\
