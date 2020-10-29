const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const { User } = require('./User');

const tableName = 'Roles';

const Role = sequelize.define('Role', {
	roleName: {
		type: Sequelize.STRING,
		unique: true,
	},
}, { tableName });

Role.associate = (models) => {
	Role.hasMany(User, { as: 'users', foreignKey: 'roleId' });
};

module.exports = { Role };
