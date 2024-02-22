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
const upload = require("../middlewares/multer")

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
router.get('/userProfile/:id', authMiddleware,usersController.userProfile);

// Login
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', loginValidations, usersController.processToLogin);


// Register

router.get('/register', guestMiddleware,usersController.register);
router.post('/register', upload.single('imgProfile'), registerValidations, usersController.processToRegister); 

// Editar Preferencias
router.get('/editUser/:id/preference', authMiddleware,usersController.preference)  
router.put('/editUser/:id/preference', upload.single("imgProfile"), usersController.editPreferences);


// Eliminar usuario 
router.delete('/delete/:id', authMiddleware,usersController.delete); 

module.exports = router;