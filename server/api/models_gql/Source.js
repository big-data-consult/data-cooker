const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Target = require("./Target");

const tableName = 'Sources';

const Source = sequelize.define('Source', {
	targetId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter the id value of the aggration target',
			},
		},
	},
	sourceLabel: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true,
		validate: {
			notEmpty: {
				msg: 'Please enter a project/stream label of the aggregation',
			},
		},
	},
	sourceData: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a source data name',
			},
		},
	},
	sourceEnabled: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	sourceReadyTime: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	sourceCheckTime: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	sourceCheckQuery: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	patternDefault: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	patternFlexible: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a true or false to enable or disable source',
			},
		},
	},
	transformation: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a description',
			},
		},
	},
	permissionId: Sequelize.INTEGER,
}, { tableName });

Source.associate = (models) => {
	// define association between tables
	// a "Source" belongs to a single "target"
	Source.belongsTo(models.Target, {
		as: 'target',
		foreignKey: {
			fieldName: 'targetId',
			allowNull: false
		}
	});
};


module.exports = { Source };
