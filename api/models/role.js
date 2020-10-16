'use strict';
module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define(
		'Role',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: 'Please enter a role title'
					}
				}
			}
		},
		{}
	);

	Role.associate = (models) => {
		// define association between tables
		// a "role" has many "users"
		Role.hasMany(models.User, {
			as: 'user',
			foreignKey: {
				fieldName: 'roleId',
				allowNull: false,
			},
		});
	};

	return Role;
};