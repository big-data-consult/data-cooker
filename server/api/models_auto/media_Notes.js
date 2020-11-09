/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MediaNotes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    note: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pluginId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'core_Plugins',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'media_Notes',
    timestamps: true
  });
};
