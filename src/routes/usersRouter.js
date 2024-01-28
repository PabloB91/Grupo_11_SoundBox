// Requerimientos 

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path");

const usersController = require('../controllers/usersController');
const { body } = require('express-validator');





// Validacion de Registro

const registerValidations = [
    body('name').notEmpty().withMessage('Tu nombre es necesario'),
    body('lastName').notEmpty().withMessage('Tu apellido es necesario'),
    body('email').trim().notEmpty().isEmpty().withMessage('Tu E-mail es necesario'),
    body('email').isEmail().withMessage('Ingresa una dirección valida'),
    body('password').notEmpty().isLength({min: 8, max: 16 }).withMessage('La contraseña debe tener entre 8 y 16 caracteres'),
    body('password').matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayúscula'),
    body('password').matches(/[a-z]/).withMessage('La contraseña debe tener al menos una minúscula'),
    body('password').matches(/[!@#$%^&*]/).withMessage('La contraseña debe tener al menos un carácter especial (!@#$%^&*)'),
    body('confirm-password').custom((validationPassword, { req }) => {
        if (validationPassword !== req.body.password) {
          throw new Error('La contraseña no es la misma que se ingresó en el campo anterior');
        }
        return true;
      }),


];



// Validacion de Login

 const validateLoginForm = [
    body('email').isEmail().notEmpty().withMessage('Ingresa tu E-meil'),
    body('password').notEmpty().withMessage('Ingresar contrasena'),
    
];



// Multer

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



// Preferencias de usuario

router.get('/userProfile/:userId', usersController.user) 



// Login

router.get('/login', usersController.login)
/*--> Esto es una sugerencia, de crear una página con el perfil del usuario común además de la de Admin 
Es decir, según el 'id' del usuario logueado, va a mostrar lo que corresponda al Admin (crear y borrar productos) o al Usuario (perfil del usuario) */



// Register

router.get('/register', usersController.register);
router.post('/register', upload.single('imgProfile'), registerValidations, usersController.processToCreate); 
//---> El orden de los parámetros es importante, porque si no las validaciones de error no se procesan correctamente. Primero se pasa el Multer y después las Validaciones



// Editar Preferencias

router.get('/userProfile/:id/preference', usersController.preference) 
router.put('/editUser/:id/preference', upload.single("imgProfile"), usersController.editProferences);



// Eliminar usuario 
/* router.delete('/deleteUser/:id', usersController...); --> A completar */

module.exports = router;