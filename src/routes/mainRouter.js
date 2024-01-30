// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const authMiddleware = require("../middlewares/authMiddleware");
const mainController = require("../controllers/mainController");
// ********************************************

router.get("/", mainController.index);

router.get("/category/:nombre", mainController.categories)

router.get("/productCart", mainController.carrito);

router.get("/admin", mainController.admin);

router.get("/allTheProducts", mainController.allProducts);

/**
 * El siguente codigo solo es una prueba para session a recargar la pagina nos mostarar el numero en 
 * aumento, numero el cual queda guardado en el servidor.
 */
router.get('/pruebaSession', (req, res) => {

    if (req.session.visitas == undefined){
        req.session.visitas = 0;
    }
    req.session.visitas++;

    res.send('session tiene el numero = '+req.session.visitas)
});

router.get('/mostarNumeroSession', (req, res) => {
    res.send('session tiene el numero = '+req.session.visitas)
});

module.exports = router;