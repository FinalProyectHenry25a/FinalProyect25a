const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("user", {
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      usuario: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
