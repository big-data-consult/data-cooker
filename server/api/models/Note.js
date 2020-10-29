// const Sequelize = require('sequelize');

// const sequelize = require('../../config/database');

const tableName = 'Notes';

module.exports = function (sequelize, DataTypes) {
	const Note = sequelize.define('Note', {
		note: {
			type: DataTypes.STRING,
		},
	}, { tableName });

	return Note;
};
