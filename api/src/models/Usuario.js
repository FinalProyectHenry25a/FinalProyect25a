const { DataTypes, STRING } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('usuario', {
    
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
      allowNull:false,
    },

    direccion: {
      type: DataTypes.STRING,
      allowNull:false,
    },  

    nombre: {
      type: DataTypes.STRING,
      allowNull:false,
    },  

    apellido: {
      type: DataTypes.STRING,
      allowNull:false,
    },  
    
  });

};
