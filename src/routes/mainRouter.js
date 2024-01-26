// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const authMiddleware = require("../middlewares/authMiddleware");
const mainController = require("../controllers/mainController");
// ********************************************

router.get("/", mainController.index);

router.get("/categoria/:nombre", mainController.categorias)

router.get("/productCart", mainController.carrito);

router.get("/admin", mainController.admin);

router.get("/todosLosProductos", mainController.allProducts);

module.exports = router;