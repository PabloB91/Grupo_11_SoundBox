module.exports = (sequelize, dataTypes) => {
    const Pais = sequelize.define("Paises", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        country_name: {
            type: dataTypes.STRING(75),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "country",
        timestamps: false
    })

    Pais.associate = function(models){
        Pais.hasMany(models.User, {
            as: "user",
            foreignKey: "country_id"
        })
    }
    return Pais
}
