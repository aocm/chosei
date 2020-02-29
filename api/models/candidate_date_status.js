'use strict';
module.exports = (sequelize, DataTypes) => {
  const candidate_date_status = sequelize.define('candidate_date_status', {
    user_id: DataTypes.INTEGER,
    candidate_date_id: DataTypes.INTEGER,
    candidate_date_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  candidate_date_status.associate = function(models) {
    // associations can be defined here
  };
  return candidate_date_status;
};