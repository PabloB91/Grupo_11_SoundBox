// Requerimientos 
const express = require("express");
const router = express.Router();

// Controladores
//--> Se requieren ambos controladores, porque hay métodos del controlador de Usuarios que se reutilizan para el Administrador
const adminController = require("../controllers/adminController");
const usersController = require("../controllers/usersController");

// Middlewares
const authMiddleware = require('../middlewares/authMiddleware'); //--> Requerimos el 'authMiddleware'

//--> En todas las rutas se aplica el método 'admin' del 'authMiddleware' ('authMiddleware.admin'), lo que implica
//--- que si el usuario está logueado como admin, continúa con el controlador, si no, lo redirige al login) 

// Ruta para ingresar al perfil de usuario del Administrador
router.get('/profile/:id', authMiddleware.admin, usersController.userProfile);

// Ruta para ingresar al listado de todos los usuarios
router.get('/usersList', authMiddleware.admin,adminController.listUsers); 

// Ruta para ingresar al perfil de cada usuario como Administrador (para tener capacidad de borrarlos)
router.get('/userProfile/:id', authMiddleware.admin, usersController.userProfile) 

// Ruta para Editar Perfil de cada usuario como Administrador
router.put('/userProfile/:id', /* upload.single("imgProfile") ,*/ authMiddleware.admin,usersController.editUser); 

// Ruta para ingresar al listado de todos los productos como Administrador
router.get('/allTheProducts',  authMiddleware.admin, adminController.allProducts);   

// Ruta para eliminar usuario 
router.delete('/usersList/delete/:id', authMiddleware.admin, usersController.deleteUser); 

module.exports = router;