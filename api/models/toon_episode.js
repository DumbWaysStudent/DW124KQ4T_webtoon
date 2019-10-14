'use strict';
module.exports = (sequelize, DataTypes) => {
  const toon_episode = sequelize.define('toon_episode', {
    title: DataTypes.STRING,
    toon_id: DataTypes.INTEGER
  }, {});
  toon_episode.associate = function(models) {
    toon_episode.belongsTo(models.toon, {
      as: "toon",
      foreignKey: 'toon_id'
    });
    toon_episode.hasMany(models.toon_episode_image, {
      foreignKey: 'toon_episode_id',
      as: 'images'
    });
  };
  return toon_episode;
};