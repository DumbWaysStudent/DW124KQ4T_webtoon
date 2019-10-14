'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    user_id: DataTypes.INTEGER,
    toon_id: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
    favorite.belongsTo(models.toon, {
      as: "toon",
      foreignKey: 'toon_id'
    });
    favorite.belongsTo(models.user, {
      as: "user",
      foreignKey: 'user_id'
    });
  };
  return favorite;
};