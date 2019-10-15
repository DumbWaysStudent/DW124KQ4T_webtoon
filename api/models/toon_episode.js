'use strict';
module.exports = (sequelize, DataTypes) => {
  const toon_episode = sequelize.define('toon_episode', {
    title: DataTypes.STRING,
    toonId: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {});
  toon_episode.associate = function(models) {
    toon_episode.belongsTo(models.toon, {
      as: "toon",
      foreignKey: 'toonId'
    });
    toon_episode.hasMany(models.toon_episode_image, {
      foreignKey: 'toonEpisodeId',
      as: 'images'
    });
  };
  return toon_episode;
};