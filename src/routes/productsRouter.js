// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = require( "../middlewares/multer" )

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// *********** Middlewares Especificos ***********
const authMiddleware = require('../middlewares/authMiddleware'); //--> Requerimos el 'authMiddleware'

// Buscar un producto
router.get('/search', productsController.search);

// Devolver un producto 
router.get('/productDetail/:id', productsController.detail);

// Crear un producto
router.get('/create', authMiddleware.admin ,productsController.create); //--> Se aplica el método 'admin' del 'authMiddleware' ('authMiddleware.admin'), 
                                                                        //--si el usuario está logueado como admin, continúa con el controlador, si no, lo redirige al login) 
router.post('/create', upload.single('form-imagen'), productsController.processCreate);

// Editar un producto 
router.get('/edit/:id',authMiddleware.admin, productsController.edit); //--> Se aplica el método 'admin' del 'authMiddleware' ('authMiddleware.admin'), 
                                                                        //--si el usuario está logueado como admin, continúa con el controlador, si no, lo redirige al login) 
router.put('/edit/:id', upload.single('form-imagen'), productsController.processEdit);

// Eliminar un producto 
router.delete('/delete/:id', authMiddleware.admin,productsController.destroy); //--> Se aplica el método 'admin' del 'authMiddleware' ('authMiddleware.admin'), 
                                                                               //--si el usuario está logueado como admin, continúa con el controlador, si no, lo redirige al login) 
module.exports = router;