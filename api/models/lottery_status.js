'use strict';
module.exports = (sequelize, DataTypes) => {
  const lottery_status = sequelize.define('lottery_status', {
    candidate_date_id: DataTypes.INTEGER,
    lottery_status: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  lottery_status.associate = function(models) {
    // associations can be defined here
  };
  return lottery_status;
};