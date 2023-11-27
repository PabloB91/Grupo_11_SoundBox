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
app.get("/login", (req, res)=>{
  let htmlPath = path.resolve(__dirname, "src/views/login.html");
  res.sendFile(htmlPath)
})

app.get("/register", (req, res)=>{
  let htmlPath = path.resolve(__dirname, "src/views/register.html");
  res.sendFile(htmlPath)
})
