'use strict';
module.exports = (sequelize, DataTypes) => {
  const citiesTravelers = sequelize.define('citiesTravelers', {
    cityId: DataTypes.INTEGER,
    travelerId: DataTypes.INTEGER
  }, {});
  citiesTravelers.associate = function(models) {
    // associations can be defined here
  };
  return citiesTravelers;
};