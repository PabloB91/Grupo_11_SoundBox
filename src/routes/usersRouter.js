const router = require("./mainRouter");

/* ; --> Esto es una sugerencia, de crear una página con el perfil del usuario común además de la de Admin 
Es decir, según el 'id' del usuario logueado, va a mostrar lo que corresponda al Admin (crear y borrar productos) o al Usuario (perfil del usuario) */

//Crear un usuario
/* router.get('/register', usersController...) --> A completar
router.post('/register', "(Acá subir imagen)", usersController...); --> A completar */

// Editar un usuario
/* router.get('/editUser/:id', userssController...;) --> A completar
router.put('/editUser/:id', "(Acá subir imagen)", usersController...); --> A completar */

// Eliminar un usuario 
/* router.delete('/deleteUser/:id', usersController...); --> A completar */



module.exports = router;