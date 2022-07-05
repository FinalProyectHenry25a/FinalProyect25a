const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("questions", {
    id:{
        type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    user_email:{
        type: DataTypes.STRING,
    },
    product_ID:{
        type: DataTypes.STRING,
    },
    question:{
        type: DataTypes.TEXT,
    },
    answer:{
        type: DataTypes.TEXT,
    },
});
};
