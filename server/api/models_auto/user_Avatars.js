/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserAvatars', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    avatarData: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: ""
    },
    isPublic: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_Avatars',
    timestamps: true
  });
};
