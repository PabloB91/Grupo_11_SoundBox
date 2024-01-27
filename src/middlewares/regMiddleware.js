const {body} = require("express-validator");

const registerValidations = [
    body("nombre")
        .notEmpty().withMessage("Falta completar nombre"),
    body("apellido")
        .notEmpty().withMessage("Falta completar el apellido"),
    body("email")
        .notEmpty().withMessage('Falta completar el email'),
    body('password')
        .notEmpty().withMessage('Falta completar la contraseña').bail()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al  menos 6 caracteres'),
    body('avatar').custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Falta subir foto de perfil");
         }
        return true;
    })
]

module.exports = registerValidations