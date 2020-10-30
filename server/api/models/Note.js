// const Sequelize = require('sequelize');

// const sequelize = require('../../config/database');

const tableName = 'Notes';

module.exports = function (sequelize, DataTypes) {
	const Note = sequelize.define('Note', {
		note: {
			type: DataTypes.STRING,
		},
	}, { tableName });

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

	return Note;
};
