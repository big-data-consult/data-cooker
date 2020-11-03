const { Sequelize } = require('sequelize');

const sequelize = require('../../config/database');
const { User } = require('./User');

const Role = sequelize.define('Role', {
	roleName: {
		type: Sequelize.STRING,
		unique: true,
	},
}, {
	// Other model options go here
	sequelize, // We need to pass the connection instance
	modelName: 'Role', // We need to choose the model name
	tableName: 'Roles'
});


// // Role.hasMany(User, { as: 'users', foreignKey: 'roleId' });
// Role.associate = (models) => {
// 	// define association between tables
// 	// a "role" has many "users"
// 	Role.hasMany(models.User, {
// 		as: 'users',
// 		foreignKey: {
// 			fieldName: 'roleId',
// 			allowNull: true,
// 		},
// 	});

// 	// define association between tables
// 	// a "role" has many "users"
// 	Role.hasMany(models.Permission, {
// 		as: 'permissions',
// 		foreignKey: {
// 			fieldName: 'roleId',
// 			allowNull: true,
// 		},
// 	});
// };

module.exports = { Role };
