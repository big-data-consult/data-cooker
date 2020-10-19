'use strict';
const User = require("./user");

module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define('Role', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		roleName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Please enter a role Name'
				}
			}
		}
	}, {});

	// Role.associate = (models) => {
	// 	// define association between tables
	// 	// a "role" has many "users"
	// 	Role.hasMany(models.User, {
	// 		as: 'user',
	// 		foreignKey: {
	// 			fieldName: 'roleId',
	// 			allowNull: true,
	// 		},
	// 	});
	// };

	return Role;
};