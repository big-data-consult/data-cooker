const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const { User } = require('./User');

const tableName = 'Avatars';

const Avatar = sequelize.define('Avatar', {
	avatarData: {
		type: Sequelize.STRING,
		unique: false,
	},
}, { tableName });

Avatar.hasMany(User, { as: 'users', foreignKey: 'avatarId' });

module.exports = { Avatar };
