const { Sequelize } = require('sequelize');

const sequelize = require('../../config/database');
const { User } = require('./User');

const Avatar = sequelize.define('Avatar', {
	avatarData: {
		type: Sequelize.STRING,
		unique: false,
	},
}, {
	// Other model options go here
	sequelize, // We need to pass the connection instance
	modelName: 'Avatar', // We need to choose the model name
	tableName: 'Avatars'
});

// // Avatar.hasMany(User, { as: 'users', foreignKey: 'avatarId' });
// Avatar.associate = (models) => {
// 	// define association between tables
// 	// a "avatar" has many "users"
// 	Avatar.hasMany(models.User, {
// 		as: 'users',
// 		foreignKey: {
// 			fieldName: 'avatarId',
// 			allowNull: true,
// 		},
// 	});
// };

module.exports = { Avatar };
