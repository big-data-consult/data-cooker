const { Sequelize } = require('sequelize');

const sequelize = require('../../../config/database');
const { User } = require('./User');

const Avatar = sequelize.define('Avatar', {
	// id: {
	//   type: Sequelize.INTEGER,
	//   primaryKey: true,
	//   autoIncrement: true,
	// },
	avatarData: {
		type: Sequelize.STRING,
		unique: false,
	},
	isPublic: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	creatorId: Sequelize.INTEGER,
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Avatar', // We need to choose the model name
	tableName: 'user_Avatars'
});

Avatar.associate = (models) => {
	// Avatar.belongsTo(models.Plugin, {
	// 	as: 'plugin',
	// 	foreignKey: {
	// 		fieldName: 'pluginId',
	// 	},
	// });

	// Avatar.hasMany(models.User, {
	// 	as: 'users',
	// 	foreignKey: {
	// 		fieldName: 'avatarId',
	// 		allowNull: true,
	// 	},
	// });
};

module.exports = { Avatar };
