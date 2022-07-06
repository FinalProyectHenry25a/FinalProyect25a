const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('user', {

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },

    favourites: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },

    cart: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },

    shopping: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
<<<<<<< HEAD
=======
    sendEmail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

>>>>>>> f56342f91b691216f00faab6ae28cfa2eb183aa4

    emptyCart: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    
  });

};
