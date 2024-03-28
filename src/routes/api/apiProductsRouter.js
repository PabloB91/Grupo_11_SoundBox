const express = require('express');
const router = express.Router();

//Controlador
const apiProductsController = require('../../controllers/api/apiProductsController')

//Rutas

//Listado
router.get('/api/products', apiProductsController.products),
//Detalle de productos
router.get('/api/products/:id', apiProductsController.products_detail)


module.exports= router;
