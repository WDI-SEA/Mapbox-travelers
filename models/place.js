'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT
  }, {});
  place.associate = function(models) {
    // associations can be defined here
  };
  return place;
};