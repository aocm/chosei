'use strict';
module.exports = (sequelize, DataTypes) => {
  const candidate_date = sequelize.define('candidate_date', {
    candidate_date: DataTypes.DATE
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  candidate_date.associate = function(models) {
    // associations can be defined here
  };
  return candidate_date;
};