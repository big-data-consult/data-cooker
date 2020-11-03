const { Sequelize } = require('sequelize');

const sequelize = require('../../config/database');
const { User } = require("./User");

const Note = sequelize.define('Note', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	note: {
		type: Sequelize.STRING,
	},
	// useId: {
	// 	type: Sequelize.INTEGER,
	// 	allowNull: true
	// },
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Note', // We need to choose the model name
	tableName: 'Notes'
});

Note.associate = (models) => {
	Note.belongsTo(models.User, {
		as: 'user',
		foreignKey: {
			fieldName: 'userId',
			allowNull: false,
		},
	});
};

module.exports = { Note };
