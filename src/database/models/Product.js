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
            default: true
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
        Producto.hasMany(models.Categorias, {
            as: "category",
            foreignKey: "category_id"
        })
        Producto.hasMany(models.Colores, {
            as: "color",
            foreignKey: "color_id"
        })
        Producto.belongsTo(models.Estado, {
            as: "state",
            foreignKey: "state_id"
        })
    }
    /* Producto.prototype.getColors = function() {
        return Color.findAll({ where: { product_id: this.id } });
      }; */

    return Producto
} 