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
	// useId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Course', // We need to choose the model name
	tableName: 'Courses'
});

Course.associate = (models) => {
	Course.belongsTo(models.User, {
		as: 'course',
		foreignKey: {
			fieldName: 'userId',
			allowNull: false,
		},
	});
};

module.exports = { Course };
