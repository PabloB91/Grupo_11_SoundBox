const express = require('express');
const router = express.Router();

//Controlador
const apiUsersController = require('../../controllers/api/apiUsersController')

//Rutas

//Listado
router.get('/api/users', apiUsersController.users),
//Detalle de usuario
router.get('/api/users/:id', apiUsersController.users_detail)


module.exports= router;
