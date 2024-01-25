// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const authMiddleware = require("../middlewares/authMiddleware");
const mainController = require("../controllers/mainController");
// ********************************************

router.get("/", mainController.index);

router.get("/categoria/:nombre", mainController.categorias)

router.get("/login", mainController.login);

router.get("/register", mainController.register);

router.get("/productCart", mainController.carrito);

router.get("/admin", authMiddleware, mainController.admin) //--> Sugiero cambiar esto por "/userProfile", y que sirva para dirigir a una página de Admin o de usuario común,
                                           //-- según cuál esté logueado.
router.get("/todosLosProductos", mainController.allProducts);

module.exports = router;