const { Sequelize } = require('sequelize');

const sequelize = require('../../config/database');
const { User } = require("./User");

const Note = sequelize.define('Note', {
	note: {
		type: Sequelize.STRING,
	},
}, {
	// Other model options go here
	sequelize, // We need to pass the connection instance
	modelName: 'Note', // We need to choose the model name
	tableName: 'Notes'
});

// Note.belongsTo(User, { as: 'user' });
Note.associate = (models) => {
	// define association between tables
	// a "Source" belongs to a single "target"
	Note.belongsTo(models.User, {
		as: 'user',
		foreignKey: {
			fieldName: 'userId',
			allowNull: false,
		},
	});
};

module.exports = { Note };
