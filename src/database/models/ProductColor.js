//---Tabla intermedia para asociar muchos productos y muchos colores---//

module.exports = (sequelize, DataTypes) => {
    const ProductColor = sequelize.define('ProductosColores', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        tableName: 'product_color',
        timestamps: false
    });
    ProductColor.associate = function(models) {
        ProductColor.belongsTo(models.Productos, {
            foreignKey: 'product_id'
        });
        ProductColor.belongsTo(models.Colores, {
            foreignKey: 'color_id'
        });
    };

    return ProductColor;
};