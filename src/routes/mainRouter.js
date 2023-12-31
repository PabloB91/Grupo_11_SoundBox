// Acá nos falta express y el router
const express = require("express")
const router = express.Router()
// Aća nos falta traer el controller
// Acá definimos las rutas
const mainController = require("../controllers/mainController")
router.get("/", mainController.index);

router.get("/categoria/:nombre", mainController.categorias)
//---Agregar la ruta de la vista por categoría

router.get("/login", mainController.login);

router.get("/register", mainController.register);

router.get("/productDetail", mainController.productDetail);

router.get("/productCart", mainController.carrito);

router.get("/crearProducto", mainController.crear);

router.get("/todosLosProductos", mainController.allProducts);

module.exports = router;