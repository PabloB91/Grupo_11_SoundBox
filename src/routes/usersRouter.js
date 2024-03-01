// Requerimientos 
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const { body, check } = require('express-validator');

// Controlador de usuarios
const usersController = require('../controllers/usersController');

// Middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require("../middlewares/multer")  //--> Acá requerimos a toda la configuración de multer (el 'destination' y 'filename')

// Validacion de Registro
const registerValidations = [
    body('name').notEmpty().withMessage('Tu nombre es necesario'),
    body('lastName').notEmpty().withMessage('Tu apellido es necesario'),
    body('email').trim().notEmpty().isEmail().withMessage('Tu E-mail es necesario'),
    body('password').notEmpty().isLength({min: 8, max: 16 }).withMessage('La contraseña debe tener entre 8 y 16 caracteres'),
    body('password').matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayúscula'),
    body('password').matches(/[a-z]/).withMessage('La contraseña debe tener al menos una minúscula'),
    body('password').matches(/[!@#$%^&/_*]/).withMessage('La contraseña debe tener al menos un carácter especial (!@#$%^&*)'),
    body('confirm-password').custom((validationPassword, { req }) => {
        if (validationPassword !== req.body.password) {
          throw new Error('La contraseña no es la misma que se ingresó en el campo anterior');
        }
        return true;
      }),
];


// Validacion de Login
const loginValidations = [
    check('email').notEmpty().withMessage('Ingresa tu E-mail').isEmail().withMessage('Ingresa un correo electrónico válido'),
    check('password').notEmpty().withMessage('Ingresa tu contraseña').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
];


// Perfil del usuario
/**
 * en esta linea de codigo estamos diciendo que al entrar en la ruta /userProfile/:userId nos va a
 * devolver la vista de user que esta en el usersController. Además, se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
 * si no, lo redirige al login)
 */
router.get('/userProfile/:id', authMiddleware,usersController.userProfile);

// Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', loginValidations, usersController.processToLogin);

// Register

router.get('/register', guestMiddleware,usersController.register);
router.post('/register', upload.single('imgProfile'), registerValidations, usersController.processToRegister); //-->Se guarda la imagen a través de multer, y los datos a través de Sequelize

// Editar Preferencias
/* router.get('/editUser/:id', authMiddleware,usersController.edit)  /*--> se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                                                     * si no, lo redirige al login) */ 
router.put('/userProfile/:id', /* upload.single("imgProfile") ,*/ usersController.editUser);

// Eliminar usuario 
router.delete('/delete/:id', authMiddleware,usersController.delete); /* se aplica el 'authMiddleware' (si el usuario está logueado, continúa con el controlador,
                                                                    * si no, lo redirige al login) */

// Eliminar usuario 
router.delete('/delete/:id', authMiddleware,usersController.delete); 

module.exports = router;