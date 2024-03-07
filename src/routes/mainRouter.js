// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const mainController = require("../controllers/mainController");
// ********************************************

// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware'); //--> Requerimos el 'authMiddleware'
// ********************************************

router.get("/",mainController.index);

router.get("/category/:nombre", mainController.categories)

router.get("/productCart", authMiddleware.common_user, mainController.carrito); //--> Se aplica el método 'common_user' del 'authMiddleware' ('authMiddleware.common_user'),
                                                                                //--si el usuario está logueado como usuario común, continúa con el controlador, si no, lo redirige al login) 

router.get("/admin", authMiddleware.admin, mainController.admin); //--> Se aplica el método 'admin' del 'authMiddleware' ('authMiddleware.admin'), 
                                                                  //--si el usuario está logueado como admin, continúa con el controlador, si no, lo redirige al login) 

module.exports = router;