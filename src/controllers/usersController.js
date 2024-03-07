// Requerimientos
const express = require("express")
const app = express();
const bcrypt = require("bcryptjs")
const db = require("../database/models")

const { validationResult } = require("express-validator");
const { log } = require("console");

// Funcionalidades
const usersControllers = {

    // (GET) Formulario de Registro
    register: (req, res) => {
        res.render("forms/register")
    },
    // (POST) Proceso de Registro
    processToRegister: async (req, res) => {
        console.log("file.file:", req.file);
        console.log("file.filename:", req.file);
        try {
            const errores = validationResult(req);  //--->Traemos las validaciones
            // console.log(errores);

            let country_registro;  //--> Esto es para tomar el valor de país del input de usuario y guardarlo con el Id correspondiente
            if (req.body.country == 'Argentina') {
                country_registro = 1
            } else if (req.body.country == 'Colombia') {
                country_registro = 2
            }

            if (!errores.isEmpty()) { //-->Si existen errores, se renderizan y además se renderizan los input de usuario que sean correctos en el objeto 'old' 
                //console.log("Errores: ", errores);
                return res.render("forms/register.ejs", { errores: errores.array(), old: req.body })
            } else {
                const passwordToValidate = req.body.password  //-->Se trae el password ingresado por el usuario, para su posterior hasheo
                //--> Se llama al método de Sequelize 'create' para crear un registro en la DB 
                let CreateUser = await db.Usuarios.create({
                    first_name: req.body.name,      //-->Los nombres de los campos tienen que ser iguales a los nombres del modelo 'Usuario' de DB
                    last_name: req.body.lastName,
                    e_mail: req.body.email,
                    password: bcrypt.hashSync(passwordToValidate, 10),
                    image: req.file == undefined ? "alvaro.jpg" : req.file.filename,    //--> Acá guardamos el NOMBRE del archivo en la BD, y después se renderiza la ruta completa con EJS
                    registered_date: Date.now(),    //--> Esta función trae la fecha actual

                    user_type_id: 2,    //--> En este caso el Id debería ser siempre '2', porque es el que corresponde a 'common_user'
                    //--Definir cómo vamos a crear el usuario 'admin', que debería ser creado una sola vez.
                    country_id: country_registro
                })
                console.log("usuario a crear: ", CreateUser);  //--> Muestra por consola cómo quedó el registro que se inserta en la BD
                return res.redirect('login')  //--> Una vez creado el registro en la DB. se redirige a la página de logueo
            }
        }   //--Hay que usar 'return' para evitar el error de '[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client'
        catch (err) {
            return console.log(err); //--> Esto nos muestra en la consola si es que hubo algún error en el proceso
        }
    },
    // (GET) Formulario de Login
    login: (req, res) => {
        res.render("forms/login.ejs");
    },
    // (POST) Proceso de Login
    processToLogin: async (req, res) => {
        let userToLogIn;   //--> Creamos la variable del usuario a loguearse 

        // Obtengo el valor de user_type y guárdalo en req.session.userType /* BAUTI REVISAR SI ESTO FUNCIONA */
        
        try {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                let userToFind = await db.Usuarios.findOne({   //--> Crea una variable 'userToFind', que busca el usuario en la DB según el e_mail del formulario
                    where: {
                        e_mail: req.body.email
                    },
                    include: [
                        { association: "user_type", attributes: ['user_type'] } //--> Vamos a buscar el tipo de usuario a través de la relación entre tablas, especificando que solo queremos el valor del tipo de usuario
                    ]
                })
                
                if (req.body.email === userToFind.e_mail) {     //--> Si el e_mail ingresado coincide con alguno buscado en la DB, pasa a comparar las contraseñas
                    if (bcrypt.compareSync(req.body.password, userToFind.password)) {
                        req.session.userType = userToFind.user_type.user_type;   /* BAUTI REVISAR SI ESTO FUNCIONA */
                        if (req.body.remember != undefined) {        //--> Creación de cookie con el email del usuario, para poder recuperar la sesión 
                            //--> Si el usuario clickea el checkbox, se crea la cookie. 'req.body.remember' es el elemento HTML del checkbox
                            //--> Entonces si ese elemento NO es indefinido (al clickearse, toma el valor de 'on'), se crea la cookie.
                            console.log("remember: ", req.body.remember);/* (verificar el valor del checkbox) */
                            console.log("sigue");
                            delete userToFind['dataValues'].password       //--> Borramos el password de la variable a guardar en session, por seguridad
                            delete userToFind['_previousDataValues'].password
                            userToLogIn = userToFind;           //--> Si las contraseñas coinciden, hacemos que la variable usuario a loguearse sea igual al usuario encontrado en la DB
                            req.session.userLoggedIn = userToLogIn;
                            res.cookie('remember', userToLogIn.e_mail, { maxAge: 60000 })
                        } else {
                            delete userToFind['dataValues'].password //--> Borramos el password de la variable a guardar en session, por seguridad
                            delete userToFind['_previousDataValues'].password
                            userToLogIn = userToFind;              //--> Si las contraseñas coinciden, hacemos que la variable usuario a loguearse sea igual al usuario encontrado en la DB
                            req.session.userLoggedIn = userToLogIn;  //--> Si el usuario ingresó satisfactoriamente vamos a guardar sus datos en 'session' --> 'userLoggedIn'
                        }

                    } else {
                        return res.render("forms/login.ejs", {
                            errors: [    //--> Si no coinciden las contraseñas vuelve al login con el mensaje de error.
                                { msg: 'Las contraseñas no conciden' }
                            ],
                            old: req.body
                        });
                    }
                }
            //--> Si el usuario existe en la DB, redirecciona según el tipo de usuario logueado
            /*  console.log('El usuario existe en la DB, se redirecciona al perfil');
                console.log('userloggedin Id: ', req.session.userLoggedIn.id); */
                if (userToLogIn.user_type.user_type == 'common_user') {    
                    return res.redirect(`/users/userProfile/${userToLogIn.id}`);
                } else if (userToLogIn.user_type.user_type == 'admin') {
                    return res.redirect(`/admin`);
                }
            //--> Si el usuario no existe, redirecciona al login mostrando los errores
            } else {
                return res.render("forms/login.ejs", { errors: errors.array(), old: req.body });
            }
        }
        catch{
           /*  console.log("catch usertoLogin: ",userToLogIn); */
           //--> Si la contraseña o el email ingresados por el usuario no coinciden con los registrados en la DB entonces vamos a  enviar un error //
            if (userToLogIn === undefined) {
                return res.render("forms/login.ejs", {
                    errors: [
                        { msg: 'El correo no coincide o aún no eres parte de SoundBox' }
                    ],
                    old: req.body
                });
            }
        }   //--> Acá termina todo el 'try-catch'
    },
    // (GET) Perfil del Usuario
    //--> A este método pueden acceder tanto el admin como los usuarios comunes, con sus rutas particulares y luego de ejecutarse los middlewares
    userProfile: async (req, res) => {
        try {
            let user = await db.Usuarios.findByPk(req.params.id, {     //--> Busca el usuario en la BD según su Id
                include: [
                    { association: 'user_type' },
                    { association: 'country' }
                ]
            })
            return res.render('user/userProfile.ejs', { user })
        }   //--Hay que usar 'return' para evitar el error de '[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client'
        catch (err) {
            console.log(err);
            return res.render("not-found")
        }
    },
    // (PUT) Editar Usuario
    //--> A este método pueden acceder tanto el admin como los usuarios comunes, con sus rutas particulares y luego de ejecutarse los middlewares
    editUser: async (req, res) => {
        console.log("Edit User");
        try {
            let e_mail = await req.body.e_mail
            console.log(e_mail);
            let userToEdit = await db.Usuarios.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                /* password: req, */
                e_mail: req.body.e_mail,
                /* country:,  */
            }, {
                where: {
                    id: req.params.id
                }
            })

            return res.redirect(req.params.id)

        } catch (err) {
            console.log(err);
            return res.render("not-found")
        }
    },
    // (DELETE) Borrar usuario
    //--> A este método sólo puede acceder el admin
    deleteUser: async (req, res) => {
        try {
            let users = await db.Usuarios.destroy({
                where: {
                    id: req.params.id
                }
            })
            console.log("Usuario borrado");
            res.redirect("/admin/usersList")
        }
        catch (err) {
            console.log(err);
            res.render("not-found")
        }
    },
    // (DELETE) Borrar sesión
    logOut: (req, res) => {
        res.clearCookie('remember');
        loi
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = usersControllers;