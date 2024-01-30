// Requerimientos 

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const usersController = require('../controllers/usersController');
const { body, check } = require('express-validator');



// Validacion de Registro

const registerValidations = [
    body('name').notEmpty().withMessage('Tu nombre es necesario'),
    body('lastName').notEmpty().withMessage('Tu apellido es necesario'),
   /*  body('email').trim().notEmpty().isEmpty().withMessage('Tu E-mail es necesario'), */
    body('email').isEmail().withMessage('Ingresa una dirección valida'),
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
/**
 * En esta constaten estamos haciendo la validacion de emain y de password las cuales deben de cumplir
 * con los requerimientos 
 */
const loginValidations = [
    check('email').isEmail().notEmpty().withMessage('Ingresa tu E-meil'),
    check('password').notEmpty().withMessage('Ingresar contrasena'),
    check('password').isLength({min: 8}).notEmpty().withMessage('Ingresar contrasena'),
];

// Multer
/** 
 * En este bloque de codigo estamos creando la memoria donde se gusrdaran las imagenes y con el nombre 
 * que se guardaran, estamos diciendo que dentro de la carpeta users que esta dentro de la carpeta img 
 * la cual esta dentro de public vamos a guardar una imagen con el nombre:
 * USER-ICONnombreDelArchivo-numeroDelDate.now.extencionDeLaImagen.
 * ↓
 */
const storage = multer.diskStorage({

    // donde guardamos los archivos
    destination : function(req, file, cb){
        cb(null, "public/img/users")
    },

    // que nombre tendra el archivo nuevo
    filename : function(req, file, cb){
        cb(null, 'USER-ICON'+file.fieldname + " - " + Date.now() + path.extname(file.originalname));
    }

});
const upload = multer({storage});

// Perfil del usuario
/**
 * en esta linea de codigo estamos diciendo que al entrar en la ruta /userProfile/:userId nos va a
 * decolver la vista de user que esta en el usersConreoller
 */
router.get('/userProfile/:userId', usersController.user);

// Login
/**
 * en esta dos lineas de codigo lo que estamos diciendo es que al entrar en la ruta por get de /login
 * vamos a usar del usersController le objeto login y en el router que viaja por post estamo diciendo
 * que vamos a usar la validacion y por ultimo vamos a ingresar al processToRegister que esta en el 
 * usersController
 */
router.get('/login', authMiddleware, usersController.login);
router.post('/login', loginValidations, usersController.processToLogin);

router.get('/estaLog')

// Register
/**
 * en esta dos lineas de codigo lo que estamos diciendo es que al entrar en la ruta por get de /regiter
 * vamos a usar del usersController le objeto register y en el router que viaja por post estamo diciendo
 * que vamos a cargar una sola imagen en el input con el name imgProfile luego vamos a usar la validacion
 * y por ultimo vamos a ingresar al processToCreate que esta en el usersController
 */
router.get('/register', usersController.register);
router.post('/register', upload.single('imgProfile'), registerValidations, usersController.processToRegister); 
//---> El orden de los parámetros es importante, porque si no las validaciones de error no se procesan correctamente. Primero se pasa el Multer y después las Validaciones

// Editar Preferencias

router.get('/userProfile/:id/preference', usersController.preference) 
router.put('/editUser/:id/preference', upload.single("imgProfile"), usersController.editProferences);

// Eliminar usuario 
/* router.delete('/deleteUser/:id', usersController...); --> A completar */

module.exports = router;