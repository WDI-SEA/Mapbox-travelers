'use strict';
module.exports = (sequelize, DataTypes) => {
  const city = sequelize.define('city', {
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    long: DataTypes.DECIMAL
  }, {});
  city.associate = function(models) {
    // associations can be defined here
  };
  return city;
};