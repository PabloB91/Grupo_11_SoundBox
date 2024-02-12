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
        Color.hasMany(models.Productos, {
            as: "products",
            foreignKey: "color_id"
        })
    }

    return Color
}