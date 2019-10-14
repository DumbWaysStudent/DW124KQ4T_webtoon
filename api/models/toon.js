'use strict';
module.exports = (sequelize, DataTypes) => {
  const toon = sequelize.define('toon', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
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
  };
  return toon;
};