'use strict';
module.exports = (sequelize, DataTypes) => {
  const traveler = sequelize.define('traveler', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {});
  traveler.associate = function(models) {
    // associations can be defined here
    models.traveler.belongsToMany(models.city, { through: models.citiesTravelers })
  };
  return traveler;
};