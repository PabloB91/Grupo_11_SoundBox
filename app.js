const path = require("path")
const express = require("express");
const app = express();
app.use(express.static("public"));

app.listen(3050,()=>{
    console.log ("Servidor funcionando en: http://localhost:3050/")
});

app.get("/", (req, res)=>{
  let htmlPath = path.resolve(__dirname, "src/views/index.html");
  res.sendFile(htmlPath)
})