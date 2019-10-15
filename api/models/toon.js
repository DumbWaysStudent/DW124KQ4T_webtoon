'use strict';
module.exports = (sequelize, DataTypes) => {
  const toon = sequelize.define('toon', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {});
  toon.associate = function(models) {
    toon.belongsTo(models.user, {
      as: "user",
      foreignKey: 'userId'
    });
    toon.hasMany(models.toon_episode, {
      foreignKey: 'toonId',
      as: 'episodes'
    });
    toon.hasMany(models.favorite, {
      foreignKey: 'toonId',
      as: 'favorites'
    });
  };
  return toon;
};