const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('user', {
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull:false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull:false,
    },  

    firstname: {
      type: DataTypes.STRING,
      allowNull:false,
    },  

    lastname: {
      type: DataTypes.STRING,
      allowNull:false,
    },  
    
  });

};
