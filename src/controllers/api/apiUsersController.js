const db = require('../../database/models')
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const apiUsersController = {
    users: async (req, res) => {
        try {
            const usuarios = await db.Usuarios.findAll({
                include: [
                    {association: "user_type"},
                    {association: "country"}
                ]
                
            });
            let users= []; //--> Creamos un array vacío para agregar los usuarios con los atributos pedidos, de manera ordenada
            for (const user of usuarios) {
                users.push({
                            'Id': user.id,
                            'name': user.first_name,
                            'email': user.e_mail,
                            'detail': `/api/users/${user.id}`
                        })
            }
            return res.status(200).json({
                meta: {
                    status: 200,
                    count: usuarios.length,
                    url: "/api/users"
                },
                users: users //--> La llave 'usuarios' pedida va a tener como valor el array de usuarios que creamos antes
            });
            
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: "Error interno del servidor"
                }
            });
        }
    },
    users_detail: async (req, res) =>{
        try {
            let user = await db.Usuarios.findByPk(req.params.id, {
				//--> Busca el usuario en la BD según su Id
				include: [
					{ association: "user_type" },
					{ association: "country" },
				]
            });
            return res.status(200).json({
                meta: {
                    status: 200,
                    id: user.id, 
                    url: `/api/users/${user.id}`
                },
                user: {
                    'id': user.id,
                    'name': user.first_name,
                    'last_name': user.last_name,
                    'email': user.e_mail, 
                    'image': `/public/img/users/${user.image}`,
                    'registered_date': user.registered_date,
                    'country': user.country.country
                    }
            });
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            return res.status(500).json({
                meta: {
                    status: 500,
                    message: "Error interno del servidor"
                }
            });
        } 
    }
}

module.exports= apiUsersController


