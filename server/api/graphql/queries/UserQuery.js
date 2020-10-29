const {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { UserType } = require('../types');
const { User } = require('../../models');

const userQuery = {
	type: new GraphQLList(UserType),
	args: {
		id: {
			name: 'id',
			type: GraphQLInt,
		},
		userName: {
			name: 'username',
			type: GraphQLString,
		},
		firstName: {
			name: 'firstname',
			type: GraphQLString,
		},
		lastName: {
			name: 'lastname',
			type: GraphQLString,
		},
		email: {
			name: 'email',
			type: GraphQLString,
		},
		avatarid: {
			name: 'avatarId',
			type: GraphQLInt,
		},
		roleid: {
			name: 'roleId',
			type: GraphQLInt,
		},
		permissionid: {
			name: 'permissionId',
			type: GraphQLInt,
		},
		createdAt: {
			name: 'createdAt',
			type: GraphQLString,
		},
		updatedAt: {
			name: 'updatedAt',
			type: GraphQLString,
		},
	},
	resolve: (user, args) => User.findAll({ where: args }),
};

module.exports = { userQuery };
