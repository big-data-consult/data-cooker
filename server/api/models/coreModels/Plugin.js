const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
// const { Plugin } = require("./Plugin");

const Plugin = sequelize.define('Plugin', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	pluginName: {
		type: Sequelize.STRING,
		unique: true,
	},
	// roleId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Plugin', // We need to choose the model name
	tableName: 'core_Plugins'
});

Plugin.associate = (models) => {
	Plugin.hasMany(models.Role, {
		as: 'permissions',
		foreignKey: {
			fieldName: 'pluginId',
			allowNull: false,
		},
	});
};


module.exports = { Plugin };
