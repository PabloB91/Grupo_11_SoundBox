const express = require("express");
const path = require("path")
const app = express();
app.use(express.static("public"));

app.listen(3050,()=>{
    console.log ("Servidor funcionando en: http://localhost:3050/")
});

app.get("/", (req, res)=>{
  let htmlPath = path.resolve(__dirname, "views/home.html");
  res.sendFile(htmlPath)
})

/* FORMS */

/*login*/

app.get("/login", (req, res)=>{
  let htmlPath = path.resolve(__dirname, "views/login.html");
  res.sendFile(htmlPath)
})

/*register*/

app.get("/register", (req, res)=>{
  let htmlPath = path.resolve(__dirname, "views/register.html");
  res.sendFile(htmlPath)
})

/* carrito  */

app.get("/productCart", (req, res)=>{
  let htmlPath = path.resolve(__dirname, "views/productCart.html");
  res.sendFile(htmlPath)
})

/* descripcion de producto  */

app.get("/productDetail", (req, res)=>{
  let htmlPath = path.resolve(__dirname, "views/productDetail.html");
  res.sendFile(htmlPath)
})

