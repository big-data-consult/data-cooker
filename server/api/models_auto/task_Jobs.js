/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaskJobs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    jobName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jobStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    jobEnabled: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    repeatSchedule: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scheduleType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scheduleCron: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scheduleBegin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    scheduleEnd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nextSchedule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastSchedule: {
      type: DataTypes.STRING,
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
    tableName: 'task_Jobs',
    timestamps: true
  });
};
