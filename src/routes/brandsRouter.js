//-------- RUTAS MARCAS SOUNDBOX --------//

// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path")

// ************ Controller Require ************
const brandsController = require('../controllers/brandsController');

// *********** Middlewares Especificos ***********
const authMiddleware = require('../middlewares/authMiddleware'); //--> Requerimos el 'authMiddleware'

// *********** Multer ***********
const storage = multer.diskStorage({

    // donde guardamos los archivos (OJO: pendiente crear la carpeta brands en img y ubicar los archivos svg de las 7 marcas que distribuye SOUNDBOX 
    
    destination : function(req, file, cb){
        cb(null, "public/img/brands") // OJO: Está pendiente crear carpeta 'brands'
    },

    // que nombre tendra el archivo nuevo
    filename : function(req, file, cb){
        cb(null, 'SOUNDBOX-BRAND'+file.fieldname + " - " + Date.now() + path.extname(file.originalname));
    }

});
const upload = multer({storage});

// OJO: Pendiente desarrollar la vista de las marcas SOUNDBOX 

// Devolver todas las marcas
router.get('/allbrands', brandsController.listBrands);

/* // Devolver una marca
router.get('/brandDetail/:id', brandsController.detail);

// Crear una marca
router.get('/createBrand', authMiddleware ,brandsController.create);// --> Se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                                // si no, lo redirige al login) //
router.post('/createBrand', upload.array('form-imagen'), brandsController.processCreate);
//router.post('/createBrand', upload.single('image'),brandsController.processCreate); //

// Editar una marca 
router.get('/editBrand/:id',authMiddleware, brandsController.edit); // --> Se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                // si no, lo redirige al login) //
router.put('/editBrand/:id', upload.array('form-imagen'), brandsController.processEdit);

// Eliminar una marca 
router.delete('/delete/:brandId', authMiddleware,brandsController.destroy);  //--> Se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                                             // si no, lo redirige al login) 
 */
module.exports = router;