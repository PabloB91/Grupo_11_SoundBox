module.exports = (sequelize, dataTypes) => {
    const Estado = sequelize.define("Estado", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        state: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    },
    {
        tableName: "state",
        timestamps: false
    })

    Estado.associate = function(models){
        Estado.hasMany(models.Productos, {
            as: "products",
            foreignKey: "state_id"
        })
    }
    return Estado
}
