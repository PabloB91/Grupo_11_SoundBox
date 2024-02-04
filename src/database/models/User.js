module.exports = (sequelize, dataTypes) => {
    const Usuario = sequelize.define("Usuarios", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        first_name: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        password: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        e_mail: {
            type: dataTypes.STRING(150),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255),
        },
        registered_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        }
    }, 
    {
        tableName: "user",
        timestamps: false
    })

    Usuario.associate = function(models){
        Usuario.belongsTo(models.User-Type, {
            as: "Tipo_de_Usuario",
            foreignKey: "user_type_id"
        })
        Usuario.belongsTo(models.Country, {
            as: "Pais",
            foreignKey: "country_id"
        })
    }

    return Usuario
}