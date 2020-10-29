// const Target = require("./target");

const tableName = 'Sources';

module.exports = (sequelize, DataTypes) => {
	const Source = sequelize.define('Source', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		targetId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter the id value of the aggration target',
				},
			},
		},
		sourceLabel: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: {
					msg: 'Please enter a project/stream label of the aggregation',
				},
			},
		},
		sourceData: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a source data name',
				},
			},
		},
		sourceEnabled: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		sourceReadyTime: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		sourceCheckTime: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		sourceCheckQuery: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		patternDefault: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		patternFlexible: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a true or false to enable or disable source',
				},
			},
		},
		transformation: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a description',
				},
			},
		},
		permissionId: DataTypes.INTEGER,
	}, { tableName });

	Source.associate = (models) => {
		// define association between tables
		// a "Source" belongs to a single "target"
		Source.belongsTo(models.Target, {
			as: 'target',
			foreignKey: {
				fieldName: 'targetId',
				allowNull: false,
			},
		});
	};

	return Source;
};
