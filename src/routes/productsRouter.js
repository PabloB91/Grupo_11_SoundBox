// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// Devolver todos los productos  
router.get('/', productsController.index);

// Devolver un producto 
router.get('/detail/:id/', productsController.detail);

// Crear un producto
router.get('/create', productsController.create);
router.post('/create', productsController.processCreate);

// Editar un producto 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.processEdit);

// Eliminar un producto 
router.delete('/delete/:id', productsController.destroy);
/* Quiten el comentario y editen según el enunciado






*/

module.exports = router;