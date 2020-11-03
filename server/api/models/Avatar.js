const { Sequelize } = require('sequelize');

const sequelize = require('../../config/database');
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
}, {
	sequelize, // We need to pass the connection instance
	modelName: 'Avatar', // We need to choose the model name
	tableName: 'Avatars'
});

// Avatar.associate = (models) => {
// 	Avatar.hasMany(models.User, {
// 		as: 'users',
// 		foreignKey: {
// 			fieldName: 'avatarId',
// 			allowNull: true,
// 		},
// 	});
// };

module.exports = { Avatar };
