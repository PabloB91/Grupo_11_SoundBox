// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// *********** Multer ***********
const storage = multer.diskStorage({

    destination:(req, res, cb)=>{
 
       // donde gurdamos los archivos
       cb(null, 'public/img/products');
       
     },
     
     
     filename:(req, file, cb)=>{
     
         console.log(file);
         //nombre de los archivos
         cb(null, 'SOUNDBOX_'+file.fieldname+'-'+Date.now()+path.extname(file.originalname));
     }
 });
 
const upload = multer({storage});

// Devolver un producto 
router.get('/productDetail', productsController.detail);

// Crear un producto
router.get('/create', productsController.create);
router.post('/create', upload.array('imagen'), productsController.processCreate);
/* router.post('/create', upload.single('image'),productsController.processCreate); */

// Editar un producto 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.processEdit);

// Eliminar un producto 
router.delete('/delete/:id', productsController.destroy);

module.exports = router;