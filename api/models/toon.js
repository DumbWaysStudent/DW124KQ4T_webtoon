'use strict';
module.exports = (sequelize, DataTypes) => {
  const toon = sequelize.define('toon', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {});
  toon.associate = function(models) {
    toon.belongsTo(models.user, {
      as: "user",
      foreignKey: 'user_id'
    });
    toon.hasMany(models.toon_episode, {
      foreignKey: 'toon_id',
      as: 'episodes'
    });
    toon.hasMany(models.favorite, {
      foreignKey: 'toon_id',
      as: 'favorites'
    });
  };
  return toon;
};