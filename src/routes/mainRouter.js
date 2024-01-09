// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const mainController = require("../controllers/mainController");
// ********************************************

router.get("/", mainController.index);

router.get("/categoria/:nombre", mainController.categorias)

router.get("/login", mainController.login);

router.get("/register", mainController.register);

router.get("/productCart", mainController.carrito);

router.get("/admin", mainController.admin)

router.get("/todosLosProductos", mainController.allProducts);

module.exports = router;