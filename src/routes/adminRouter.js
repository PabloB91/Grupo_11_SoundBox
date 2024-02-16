const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

const authMiddleware = require('../middlewares/authMiddleware'); //--> Requerimos el 'authMiddleware'

router.get('/usersList', authMiddleware,adminController.listUsers); /* --> Se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                                * si no, lo redirige al login) */

router.get('/allTheProducts', authMiddleware,adminController.allProducts);
module.exports = router;