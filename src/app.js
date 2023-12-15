const express = require("express");
const path = require("path")
const app = express();

app.use(express.static("public"));

// Acá falta el template engine
    
app.set("view engine", "ejs")

app.set('views', path.resolve(__dirname, "views"));

// Rutas
const mainRouter = require("./routes/mainRouter");
app.use("/", mainRouter);

app.listen(3050,()=> {
    console.log ("Servidor funcionando en: http://localhost:3050/")
});

app.use((req, res, next) => {
    res.status(404).render("not-found")
});