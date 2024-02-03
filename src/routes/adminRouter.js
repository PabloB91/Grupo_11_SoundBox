const express = require("express");
const router = express.Router();
const aController = require("../controllers/adminController");

const authMiddleware = require('../middlewares/authMiddleware'); //--> Requerimos el 'authMiddleware'

router.get('/usersList', authMiddleware,aController.listUsers); /* --> Se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                                * si no, lo redirige al login) */

module.exports = router;