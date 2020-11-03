const { Sequelize } = require('sequelize');

const sequelize = require('../../config/database');
// const { Permission } = require("./Permission");

const Permission = sequelize.define('Permission', {
	pluginId: {
		type: Sequelize.INTEGER,
	},
}, {
	// Other model options go here
	sequelize, // We need to pass the connection instance
	modelName: 'Permission', // We need to choose the model name
	tableName: 'Permissions'
});

Permission.associate = (models) => {
	// define association between tables
	Permission.belongsTo(models.Role, {
		as: 'role',
		foreignKey: {
			fieldName: 'roleId',
			allowNull: false,
		},
	});
};


module.exports = { Permission };
