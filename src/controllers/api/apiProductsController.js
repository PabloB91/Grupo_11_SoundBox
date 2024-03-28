const db = require('../../database/models')
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const apiProductsController = {
    products: async (req, res) => {     //--> Método para enviar todos los productos
        try {
            const productos = await db.Productos.findAll({
                include: [
                    { model: db.Colores, attributes: ["color_name"] }, // Vamos a buscar los colores a través de la relación entre tablas, especificando que solo queremos el nombre de los colores
					{ association: "state" },
					{ association: "category" },
					{ association: "brand", attributes: ["brand_name"] }, // Vamos a buscar la marca a través de la relación entre tablas, especificando que solo queremos el nombre de la marca
                ]
            });
            const categorias= await db.Categorias.findAll({
                include: [
                    {association: 'products'}
                ]
            })

            let products= []; //--> Creamos un array vacío para agregar los productos con los atributos pedidos, de manera ordenada
            let countCat= {}; //--> Creamos un objeto literal vacío para agregar las categorías y el conteo de productos de cada una

            for (let i = 0; i < categorias.length; i++) {
                let key = `${categorias[i].category}`; // Generamos una llave por cada categoría
                let value = `${categorias[i].products.length}`; // Generamos la cantidad de productos de cada categoría
                countCat[key] = value; // Asignamos las llaves valores al objeto literal creado
            }
            for (const product of productos) {
                let colors = product.Colores.map(color => color.color_name); // Extraemos sólo los nombres de los colores
                products.push({
                            'Id': product.id,
                            'name': product.name,
                            'description': product.description,
                            'category': product.category.category,
                            'colors': colors, //--> Enviamos el array de colores extraídos
                            'detail': `/api/products/${product.id}`
                        });
            };
            return res.status(200).json({   //--> Enviamos los datos extraídos como JSON
                meta: {
                    status: 200,
                    count: productos.length,
                    countByCategory: countCat,  //--> Enviamos el array con el conteo de productos por categoría
                    url: "/api/products"
                },
                products: products //--> La llave 'products' pedida va a tener como valor el array de productos que creamos antes
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
    products_detail: async (req, res) =>{       //--> Método para enviar un sólo producto pedido
        try {
            let product = await db.Productos.findByPk(req.params.id, {
				//--> Busca el producto en la BD según su Id
				include: [
					{ model: db.Colores, attributes: ["color_name"] }, // Vamos a buscar los colores a través de la relación entre tablas, especificando que solo queremos el nombre de los colores
					{ association: "state" },
					{ association: "category" },
					{ association: "brand", attributes: ["brand_name"] }, // Vamos a buscar la marca a través de la relación entre tablas, especificando que solo queremos el nombre de la marca
				]
            });
            let colors = product.Colores.map(color => color.color_name); // Extraemos sólo los nombres de los colores

            return res.status(200).json({ //--> Enviamos los datos extraídos como JSON
                meta: {
                    status: 200,
                    id: product.id, 
                    url: `/api/products/${product.id}`
                },
                product: {
                    'Id': product.id,
                    'name': product.name,
                    'description': product.description,
                    'image': `/public/img/products/${product.image}`,
                    'quantity': product.quantity,
                    'price': product.price,
                    'discount': product.discount,
                    'brand': product.brand.brand_name,
                    'category': product.category.category,
                    'colors': colors, //--> Mostramos el array de colores extraídos
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

module.exports= apiProductsController


