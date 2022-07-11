const { text } = require("body-parser");
const { DataTypes, TEXT } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("publication", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },

    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false
    },

    model: {
      type: DataTypes.STRING,
      allowNull: false
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false 
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    images: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    color: {
      type: DataTypes.STRING,
      allowNull: false
    },

    processor: {
      type: DataTypes.STRING,
      allowNull: true
    },

    ram: {
      type: DataTypes.STRING,
      allowNull: true
    },

    rom: {
      type: DataTypes.STRING,
      allowNull: true
    },

    network: {
      type: DataTypes.STRING,
      allowNull: true
    },

    batery: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    frontal_cam: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    main_cam: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    inches: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    screen: {
      type: DataTypes.STRING,
      allowNull: true
    },

    resolution: {
      type: DataTypes.STRING,
      allowNull: true
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    review:{
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },

    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    additionalphotos:{
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },

  });
};
