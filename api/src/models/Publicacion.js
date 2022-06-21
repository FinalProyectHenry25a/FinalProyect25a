const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define("publicacion", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fecha_de_lanzamiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    imagenes: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    procesador: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    memoria_ram: {
      type: DataTypes.ENUM("4Gb", "6Gb", "8Gb", "12GB"),
      allowNull: true,
    },

    memoria_rom: {
      type: DataTypes.ENUM("32Gb", "64Gb", "128Gb", "256Gb"),
      allowNull: true,
    },

    conectividad: {
      type: DataTypes.ENUM("3G", "4G", "5G"),
      allowNull: true,
    },

    bateria: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    camara_frontal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    camara_principal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    pulgadas: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    pantalla: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    resolucion: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });
};
