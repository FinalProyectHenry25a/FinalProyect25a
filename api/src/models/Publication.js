const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("publication", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    images: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    processor: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    ram: {
      type: DataTypes.ENUM("4Gb", "6Gb", "8Gb", "12Gb"),
      allowNull: true,
    },

    rom: {
      type: DataTypes.ENUM("32Gb", "64Gb", "128Gb", "256Gb"),
      allowNull: true,
    },

    network: {
      type: DataTypes.ENUM("3G", "4G", "5G"),
      allowNull: true,
    },

    batery: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    frontal_cam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    main_cam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    inches: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    screen: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    resolution: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });
};
