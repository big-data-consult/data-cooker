// const Task = require("./task");

const tableName = 'Jobs';

module.exports = (sequelize, DataTypes) => {
	const Job = sequelize.define('Job', {
		// id: {
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true,
		// },
		jobName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a job Name',
				},
			},
		},
		jobDescription: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a data timestamp column name',
				},
			},
		},
		jobStatus: {
			type: DataTypes.STRING,
			allowNull: true,
			// validate: {
			// 	notEmpty: {
			// 		msg: 'Please choose the enable or disable',
			// 	},
			// },
		},
		jobEnabled: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please choose the enable or disable',
				},
			},
		},
		repeatSchedule: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please choose true or false for repeat',
				},
			},
		},
		scheduleType: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a time unit about how often data change',
				},
			},
		},
		scheduleCron: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a cron expression',
				},
			},
		},
		scheduleBegin: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a datatime for schedule begin',
				},
			},
		},
		scheduleEnd: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a datetime for schedule end',
				},
			},
		},
		nextSchedule: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastSchedule: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		permissionId: DataTypes.INTEGER,
	}, { tableName });

	Job.associate = (models) => {
		// define association between tables
		// a "Job" has many "courses"
		Job.hasMany(models.Task, {
			as: 'tasks',
			foreignKey: {
				fieldName: 'jobId',
				allowNull: false,
			},
		});
	};

	return Job;
};
