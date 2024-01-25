const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require("path")

const usersController = require("../controllers/usersController")
const { body } = require("express-validator")

// validaciones
const validacionesFinales = [
    body("name").notEmpty().withMessage('Este campo es necesario'),
    body("lastName").notEmpty().withMessage('Este campo es necesario'),
    body('email').trim().not().isEmpty().withMessage('Este campo es necesario'),
    body('email').isEmail().withMessage('Ingresa una direccion valida'),
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

// multer
const storage = multer.diskStorage({

    // donde guardamos los archivos
    destination : function(req, file, cb){
        cb(null, "public/img/products")
    },

    // que nombre tendra el archivo nuevo
    filename : function(req, file, cb){
        cb(null, 'USER-ICON'+file.fieldname + " - " + Date.now() + path.extname(file.originalname));
    }

});
const upload = multer({storage});


// Detalle del usuario
router.get('/userProfile/:id', usersController.detailUser) 

router.get("/login", usersController.login)
 
/*--> Esto es una sugerencia, de crear una página con el perfil del usuario común además de la de Admin 
Es decir, según el 'id' del usuario logueado, va a mostrar lo que corresponda al Admin (crear y borrar productos) o al Usuario (perfil del usuario) */

//Crear un usuario
router.get('/register', usersController.register);
router.post('/register',upload.single("imgProfile"), usersController.processToCreate);

// Editar un usuario
/* router.get('/editUser/:id', userssController...;) --> A completar
router.put('/editUser/:id', "(Acá subir imagen)", usersController...); --> A completar */

// Eliminar un usuario 
/* router.delete('/deleteUser/:id', usersController...); --> A completar */



module.exports = router;