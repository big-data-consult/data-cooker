const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
const { Job } = require('./Job');

const Task = sequelize.define('Task', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	taskNo: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a project/stream label of the aggregation',
			},
		},
	},
	taskName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a task data name',
			},
		},
	},
	taskDescription: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	taskWorker: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	taskStatus: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a description',
			},
		},
	},
	nextTaskOnSuccess: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	nextTaskOnFailure: {
		type: Sequelize.INTEGER,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	lastScheduledTime: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	lastCompleteTime: {
		type: Sequelize.STRING,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable task',
			},
		},
	},
	// permissionId: Sequelize.INTEGER,
	// jobId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Task', // We need to choose the model name
	tableName: 'task_Tasks'
});

Task.associate = (models) => {
	Task.belongsTo(models.Plugin, {
		as: 'plugin',
		foreignKey: {
			fieldName: 'pluginId',
		},
	});

	Task.belongsTo(models.Job, {
		as: 'job',
		foreignKey: {
			fieldName: 'jobId',
			allowNull: false,
		},
	});
};



module.exports = { Task };
