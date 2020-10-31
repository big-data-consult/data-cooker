// const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');
// const sequelize = require('../../config/database');

// const Role = require('./role');
// const Course = require('./course');

const hooks = {
	beforeCreate(user) {
		// eslint-disable-line no-param-reassign
		user.password = bcryptSevice().password(user);
	},
};

const tableName = 'Users';

module.exports = function (sequelize, DataTypes) {
	const User = sequelize.define('User', {
		// id: {
		// 	type: DataTypes.INTEGER,
		// 	primaryKey: true,
		// 	autoIncrement: true,
		// },
		userName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'User name is required',
				},
			},
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'First name is required',
				},
			},
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Last name is required',
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Email is required',
				},
				isEmail: {
					msg: 'Please enter a valid email address',
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Password is required',
				},
			},
		},
		permissionId: DataTypes.INTEGER,
		// avatarId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true,
		// },
		// roleId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: true,
		// },
	}, { hooks, tableName });

	User.associate = (models) => {
		// User' belongs to a single 'Role'
		User.belongsTo(models.Role, {
			as: 'role',
			foreignKey: {
				fieldName: 'roleId',
			},
		});

		// User' belongs to a single 'Avatar'
		User.belongsTo(models.Avatar, {
			as: 'avatar',
			foreignKey: {
				fieldName: 'avatarId',
			},
		});

		//'User' has many 'Courses'
		User.hasMany(models.Course, {
			as: 'courses',
			foreignKey: {
				fieldName: 'userId',
			},
		});

		//'User' has many 'Notes'
		User.hasMany(models.Note, {
			as: 'notes',
			foreignKey: {
				fieldName: 'userId',
			},
		});
	};

	return User;
};
