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
      foreignKey: 'user_id',
      as: 'toons'
    });
    user.hasMany(models.favorite, {
      foreignKey: 'user_id',
      as: 'favorites'
    });
  };
  return user;
};