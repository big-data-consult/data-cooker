const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Plugin', {
		// id: {
		//   type: DataTypes.INTEGER,
		//   primaryKey: true,
		//   autoIncrement: true,
		// },
		pluginName: {
			type: DataTypes.STRING,
			unique: true,
		},
		// roleId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true
		// },
	}, {
		sequelize, 
		tableName: 'core_Plugins',
		timestamps: true
	});
};
