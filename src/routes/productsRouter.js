// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/* Quiten el comentario y editen según el enunciado

// Devolver todos los productos  
router.???('/', productsController.index); 

// Crear un producto
router.???('/???/', productsController.create); 
router.???('/', productsController.store); 

// Devolver un producto 
router.???('/:id/', productsController.detail); 

// Editar un producto 
router.???('/:id/???', productsController.edit); 
router.???('/:id', productsController.update); 

// Eliminar un producto 
router.???('/:id', productsController.destroy);

*/

module.exports = router;