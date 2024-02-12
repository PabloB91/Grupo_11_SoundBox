module.exports = (sequelize, dataTypes) => {
    const TipoUsuario = sequelize.define("Tipo_de_usuario", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        country_name: {
            type: dataTypes.STRING(50),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "user_type",
        timestamps: false
    })

    TipoUsuario.associate = function(models){
        TipoUsuario.hasMany(models.Usuarios, {
            as: "user",
            foreignKey: "user-type_id"
        })
    }

    return TipoUsuario
}