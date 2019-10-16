'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.TEXT
  }, {});
  user.associate = function(models) {
    user.hasMany(models.toon, {
      foreignKey: 'userId',
      as: 'toons'
    });
    user.hasMany(models.favorite, {
      foreignKey: 'userId',
      as: 'favorites'
    });
  };
  return user;
};