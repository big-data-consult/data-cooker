const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');

const sequelize = require('../../config/database');
const { Note } = require('./Note');
const Avatar = require("./Avatar");
const Role = require("./Role");
const Course = require("./Course");

const hooks = {
	beforeCreate(user) {
		user.password = bcryptSevice().password(user); // eslint-disable-line no-param-reassign
	},
};

const tableName = 'Users';

const User = sequelize.define('User', {
	userName: {
		type: Sequelize.STRING,
		unique: true,
	},
	firstName: {
		type: Sequelize.STRING,
		unique: false,
	},
	lastName: {
		type: Sequelize.STRING,
		unique: false,
	},
	email: {
		type: Sequelize.STRING,
		unique: true,
	},
	password: {
		type: Sequelize.STRING,
	},
	avatarId: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	roleId: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	permissionId: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
	const values = Object.assign({}, this.get());

	delete values.password;

	return values;
};

User.associate = (models) => {
	//User" belongs to a single "Role"
	User.belongsTo(models.Role, {
		as: 'role',
		foreignKey: {
			fieldName: 'roleId',
		},
	});

	//User" belongs to a single "Role"
	User.belongsTo(models.Avatar, {
		as: 'avatar',
		foreignKey: {
			fieldName: 'avatarId',
		},
	});

	// //"User" has many "Courses"
	// User.hasMany(models.Course, {
	//   foreignKey: {
	//     fieldName: 'userId',
	//   },
	// });

	User.hasMany(Note, { as: 'notes', foreignKey: 'userId' });
};

module.exports = { User };
