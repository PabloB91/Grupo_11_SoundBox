module.exports = (sequelize, dataTypes) => {
    const Pais = sequelize.define("Paises", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        country: {
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
        Pais.hasMany(models.Usuarios, {
            as: "user",
            foreignKey: "country_id"
        })
    }
    return Pais
}
