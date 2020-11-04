const { Sequelize } = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');
const sequelize = require('../../config/database');

const { Note } = require('./Note');
const { Course } = require("./Course");
const { Avatar } = require('./Avatar');
const { Role } = require("./Role");

const hooks = {
	beforeCreate(user) {
		// eslint-disable-line no-param-reassign
		user.password = bcryptSevice().password(user);
	},
};

const User = sequelize.define('User', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
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
	permissionId: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	// avatarId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
	// roleId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true,
	// },
}, {
	hooks,
	sequelize, // We need to pass the connection instance
	modelName: 'User', // We need to choose the model name
	tableName: 'Users'
});


// eslint-disable-next-line
User.prototype.toJSON = function () {
	const values = Object.assign({}, this.get());
	delete values.password;
	return values;
};

User.associate = (models) => {
	User.belongsTo(models.Avatar, {
		as: 'avatar',
		foreignKey: {
			fieldName: 'avatarId',
		},
	});

	User.belongsTo(models.Department, {
		as: 'department',
		foreignKey: {
			fieldName: 'departmentId',
		},
	});

	User.belongsTo(models.Role, {
		as: 'role',
		foreignKey: {
			fieldName: 'roleId',
		},
	});

	// User.hasMany(models.Course, {
	// 	as: 'courses',
	// 	foreignKey: {
	// 		fieldName: 'userId',
	// 	},
	// });

	// User.hasMany(models.Note, {
	// 	as: 'notes',
	// 	foreignKey: {
	// 		fieldName: 'userId',
	// 	},
	// });
};

module.exports = { User };
