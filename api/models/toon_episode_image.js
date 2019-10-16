'use strict';
module.exports = (sequelize, DataTypes) => {
  const toon_episode_image = sequelize.define('toon_episode_image', {
    url: DataTypes.TEXT,
    toonEpisodeId: DataTypes.INTEGER
  }, {});
  toon_episode_image.associate = function(models) {
    // associations can be defined here
    toon_episode_image.belongsTo(models.toon_episode, {
      as: "episode",
      foreignKey: 'toonEpisodeId'
    });
  };
  return toon_episode_image;
};