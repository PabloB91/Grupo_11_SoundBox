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
        },
        user_type_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        country_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }, 
    {
        tableName: "user",
        timestamps: false
    })

    Usuario.associate = function(models){
        Usuario.belongsTo(models.Tipo_de_usuario, {
            as: "user_type",
            foreignKey: "user_type_id"
        })
        Usuario.belongsTo(models.Paises, {
            as: "country",
            foreignKey: "country_id"
        })
    }

    return Usuario
}