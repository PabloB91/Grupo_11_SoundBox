//-------- CONTROLADOR CATEGORIAS SOUNDBOX --------//

const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const db = require("../database/models")

const brandsController = {
    listCategories: async (req, res) => {
        try {
            let categories = await db.Categorias.findAll()//la tabla se llama 'category' y el alias es 'Categorias'
            res.render("product/categories.ejs", { categories });
        }
        catch(err) {
            console.log(err);
			res.render("not-found")
		}
    }
}
module.exports = brandsController;