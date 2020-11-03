const { Sequelize } = require('sequelize');

const sequelize = require('../../config/database');
const { User } = require("./User");

const Course = sequelize.define('Course', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
		unique: true,
	},
	estimatedTime: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	materialsNeeded: {
		type: Sequelize.STRING,
		allowNull: true,
	},
}, {
	// Other model options go here
	sequelize, // We need to pass the connection instance
	modelName: 'Course', // We need to choose the model name
	tableName: 'Courses'
});

// Course.belongsTo(User, { as: 'user' });
Course.associate = (models) => {
	//Course' belongs to a single User
	Course.belongsTo(models.User, {
		as: 'course',
		foreignKey: {
			fieldName: 'userId',
			allowNull: false,
		},
	});
};

module.exports = { Course };
