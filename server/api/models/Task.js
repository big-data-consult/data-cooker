// const Job = require("./job");

const tableName = 'Tasks';

module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define('Task', {
		// id: {
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true,
		// },
		// jobId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// 	validate: {
		// 		notEmpty: {
		// 			msg: 'Please enter the id value of the aggration job',
		// 		},
		// 	},
		// },
		taskNo: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a project/stream label of the aggregation',
				},
			},
		},
		taskName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a task data name',
				},
			},
		},
		taskDescription: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		taskExecutor: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		taskStatus: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a description',
				},
			},
		},
		nextTaskOnSuccess: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		nextTaskOnFailure: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		lastScheduledTime: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		lastCompleteTime: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable task',
				},
			},
		},
		permissionId: DataTypes.INTEGER,
	}, { tableName });

	Task.associate = (models) => {
		// define association between tables
		// a "Task" belongs to a single "job"
		Task.belongsTo(models.Job, {
			as: 'job',
			foreignKey: {
				fieldName: 'jobId',
				allowNull: false,
			},
		});
	};

	return Task;
};
