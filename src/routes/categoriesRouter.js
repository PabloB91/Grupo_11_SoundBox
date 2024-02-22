//-------- RUTAS CATEGORIAS SOUNDBOX --------//

// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path")

// ************ Controller Require ************
const categoriesController = require('../controllers/categoriesController');

// *********** Middlewares Especificos ***********
const authMiddleware = require('../middlewares/authMiddleware'); //--> Requerimos el 'authMiddleware'

// *********** Multer ***********
const storage = multer.diskStorage({

    // donde guardamos los archivos
    
    destination : function(req, file, cb){
        cb(null, "public/img/productos")// OJO: ¿La vamos a cambiar por 'products'? Dentro de la carpeta productos están las carpetas de cada categoría en el momento.
    },

    // que nombre tendra el archivo nuevo
    filename : function(req, file, cb){
        cb(null, 'SOUNDBOX-CATEGORY'+file.fieldname + " - " + Date.now() + path.extname(file.originalname));
    }

});
const upload = multer({storage});

/*
// Devolver una categoría
router.get('/categoryDetail/:id', categoriesController.detail);

// Crear una categoría
router.get('/createCategory', authMiddleware ,categoriesController.create); --> Se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                                // si no, lo redirige al login)
router.post('/createCategory', upload.array('form-imagen'), categoriesController.processCreate);
 router.post('/createBrand', upload.single('image'),brandsController.processCreate);

// Editar una categoría 
router.get('/editCategory/:id',authMiddleware, categoriesController.edit); --> Se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                //si no, lo redirige al login)
router.put('/editCategory/:id', upload.array('form-imagen'), categoriesController.processEdit);

// Eliminar una categoría
router.delete('/delete/:categoryId', authMiddleware,categoriesController.destroy); // --> Se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador(si no, lo redirige al login)

*/

module.exports = router;