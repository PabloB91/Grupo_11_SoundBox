module.exports = (sequelize, dataTypes) => {
    const Producto = sequelize.define("Productos", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        image: {
            type: dataTypes.STRING(255)
        }
    },
    {
        tableName: "product",
        timestamps: false
    });
    
    Producto.associate = function(models){
        Producto.belongsTo(models.Marcas, {
            as: "brand",
            foreignKey: "brand_id"
        })
        Producto.belongsTo(models.Categorias, {
            as: "category",
            foreignKey: "category_id"
        })
        Producto.belongsToMany(models.Colores, {
            through: "product_color",   // Nombre de la tabla intermedia
            foreignKey: "product_id",
            otherKey: "color_id", // Nombre de la columna que referencia a Color en la tabla intermedia
            timestamps: false
        })
        Producto.hasMany(models.ProductosColores, {
            foreignKey: 'product_id'
        });
        Producto.belongsTo(models.Estado, {
            as: "state",
            foreignKey: "state_id"
        })
    }
    return Producto
} 