module.exports = (sequelize, dataTypes) => {
    const Color = sequelize.define("Colores", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        color_name: {
            type: dataTypes.STRING(50),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "color",
        timestamps: false
    })

    Color.associate = function(models){
        Color.belongsToMany(models.Productos, {
            through: "product_color",   // Nombre de la tabla intermedia
            foreignKey: "color_id",
            otherKey: "product_id", // Nombre de la columna que referencia a Producto en la tabla intermedia
            timestamps: false
        })
    }

    return Color
}