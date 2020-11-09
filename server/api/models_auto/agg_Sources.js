/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AggSources', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    sourceLabel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sourceData: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sourceEnabled: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sourceReadyTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sourceCheckTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sourceCheckQuery: {
      type: DataTypes.STRING,
      allowNull: true
    },
    patternDefault: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    patternFlexible: {
      type: "NTEGER",
      allowNull: false
    },
    transformation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'agg_Targets',
        key: 'id'
      }
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
    tableName: 'agg_Sources',
    timestamps: true
  });
};
