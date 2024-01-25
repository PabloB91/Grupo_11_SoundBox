const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path")

const usersController = require("../controllers/usersController")
const { body } = require("express-validator")

const validacionesFinales = [
    body("name").notEmpty().withMessage('Este campo es necesario'),
    body("last-name").notEmpty().withMessage('Este campo es necesario'),
    body('e-mail').trim().not().isEmpty().withMessage('Este campo es necesario'),
    body('e-mail').isEmail().withMessage('Ingresa una direccion valida'),
    body("password").notEmpty().isLength({min: 8, max: 16 }),
    body("password").matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una mayuscula'),
    body("password").matches(/[a-z]/).withMessage('La contraseña debe tener al menos una minuscula'),
    body("password").matches(/[!@#$%^&*]/).withMessage('La contraseña debe tener al menos un caracter especial'),
    body('confirm-password').custom((validacionDePassword, { req }) => {
        if (validacionDePassword !== req.body.password) {
          throw new Error("La contraseña no es la misma que se ingreso en el campo anterior");
        }
        return true;
      }),
];


// Detalle del usuario
router.get('/userProfile/:id', usersController.detailUser) 

router.get("/login", usersController.login)
 
/*--> Esto es una sugerencia, de crear una página con el perfil del usuario común además de la de Admin 
Es decir, según el 'id' del usuario logueado, va a mostrar lo que corresponda al Admin (crear y borrar productos) o al Usuario (perfil del usuario) */

//Crear un usuario
router.get('/register', usersController.register);
router.post('/register', usersController.processToCreate);

// Editar un usuario
/* router.get('/editUser/:id', userssController...;) --> A completar
router.put('/editUser/:id', "(Acá subir imagen)", usersController...); --> A completar */

// Eliminar un usuario 
/* router.delete('/deleteUser/:id', usersController...); --> A completar */



module.exports = router;