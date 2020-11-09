/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AggTargets', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    targetLabel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    targetData: {
      type: DataTypes.STRING,
      allowNull: false
    },
    batchControlColumn: {
      type: DataTypes.STRING,
      allowNull: false
    },
    batchControlSize: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    batchControlNext: {
      type: DataTypes.STRING,
      allowNull: false
    },
    batchProcessed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    batchProcessing: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    batchMicroChunkCurrent: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    batchScheduleType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    batchScheduleLast: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    patternColumns: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    groupByColumns: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    groupByPattern: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupByFlexible: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aggregateColumns: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    aggregateFunctions: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    suppoetSpVersions: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    tableName: 'agg_Targets',
    timestamps: true
  });
};
