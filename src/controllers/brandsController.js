//-------- CONTROLADOR MARCAS SOUNDBOX --------//

// OJO: revisar en general el tema del idioma. Estamos utilizando Espanglish en todo el proyecto.

// OJO: pendiente concretar el nombre del .ejs de las marcas: ¿ brandsList o simplmnte brands.ejs considerando que según lo acordado en grupo solo generaremos una vista con los logos de las marcas. Por ahora no vamos a generar vistas adicionales de los productos que corresponden a cada marca.

const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const db = require("../database/models")

const brandsController = {
    listBrands: async (req, res) => {
        try {
            let brands = await db.Marcas.findAll()//OJO recorderis: la tabla se llama 'brand' y el alias es 'Marcas'
            res.render("product/brandsList.ejs" /* OJO: leer el OJO de arriba */, { brands });
        }
        catch(err) {
            console.log(err);
			res.render("not-found")
		}
    }
}
module.exports = brandsController;