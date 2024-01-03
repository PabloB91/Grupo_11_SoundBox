// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// *********** Multer ***********
/* 
const storage = multer.diskStorage({

   destination: function(req, res, cb){

      // donde gurdamos los archivos
      cb(null, 'public/img/products');
      
    },
    
    
    filename: function(req, res, cb){
        
        //nombre de los archivos
        cb(null, '');
    }
});

const upload = multer({storage : storage});

 */

// Devolver todos los productos  
router.get('/', productsController.index);

// Devolver un producto 
router.get('/detail/:id/', productsController.detail);

// Crear un producto
router.get('/create', productsController.create);
router.post('/create', productsController.processCreate)
/* router.post('/create', upload.single('image'),productsController.processCreate); */

// Editar un producto 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.processEdit);

// Eliminar un producto 
router.delete('/delete/:id', productsController.destroy);

module.exports = router;