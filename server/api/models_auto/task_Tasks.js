/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TaskTasks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    taskNo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    taskWorker: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taskStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nextTaskOnSuccess: {
      type: "NTEGER",
      allowNull: true
    },
    nextTaskOnFailure: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lastScheduledTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastCompleteTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'task_Jobs',
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
    tableName: 'task_Tasks',
    timestamps: true
  });
};
