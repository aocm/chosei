'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};