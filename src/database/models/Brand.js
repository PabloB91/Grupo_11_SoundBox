module.exports = (sequelize, dataTypes) => {
    const Marca = sequelize.define("Marcas", {
        id:{
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        brand_name: {
            type: dataTypes.STRING(100),
            unique: true,
            allowNull: false
        }
    },
    {
        tableName: "brand",
        timestamps: false
    })

    Marca.associate = function(models) {
        Marca.hasMany(models.Productos, {
            as: 'products',
            foreignKey: 'brand_id'
        })
      }
    return Marca
}