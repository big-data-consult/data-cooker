/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MediaCourses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    estimatedTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    materialsNeeded: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'media_Courses',
    timestamps: true
  });
};
