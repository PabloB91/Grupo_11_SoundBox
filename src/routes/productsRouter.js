// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path")

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// *********** Multer ***********
const storage = multer.diskStorage({

    // donde guardamos los archivos
    destination : function(req, file, cb){
        cb(null, "public/img/products")
    },

    // que nombre tendra el archivo nuevo
    filename : function(req, file, cb){
        cb(null, 'SOUNDBOX'+file.fieldname + " - " + Date.now() + path.extname(file.originalname));
    }

});
const upload = multer({storage});

// Devolver un producto 
router.get('/productDetail/:id', productsController.detail);

// Crear un producto
router.get('/create', productsController.create);
router.post('/create', upload.array('form-imagen' ), productsController.processCreate);
/* router.post('/create', upload.single('image'),productsController.processCreate); */

// Editar un producto 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.processEdit);

// Eliminar un producto 
router.delete('/delete/:id', productsController.destroy);

module.exports = router;