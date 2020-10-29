const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'Notes';

const Note = sequelize.define('Note', {
	note: {
		type: Sequelize.STRING,
	},
}, { tableName });

module.exports = { Note };
