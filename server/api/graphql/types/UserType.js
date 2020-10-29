const {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLString,
	GraphQLList,
} = require('graphql');

const { NoteType } = require('./NoteType');

const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'This represents a User',
	fields: () => ({
		id: {
			type: GraphQLInt,
			resolve: (user) => user.id,
		},
		username: {
			type: GraphQLString,
			resolve: (user) => user.userName,
		},
		firstname: {
			type: GraphQLString,
			resolve: (user) => user.firstName,
		},
		lastname: {
			type: GraphQLString,
			resolve: (user) => user.lastName,
		},
		email: {
			type: GraphQLString,
			resolve: (user) => user.email,
		},
		password: {
			type: GraphQLString,
			resolve: (user) => user.password,
		},
		avatarid: {
			type: GraphQLInt,
			resolve: (user) => user.avatarId,
		},
		roleid: {
			type: GraphQLInt,
			resolve: (user) => user.roleId,
		},
		permissionid: {
			type: GraphQLInt,
			resolve: (user) => user.permissionId,
		},
		notes: {
			type: new GraphQLList(NoteType),
			resolve: (user) => user.getNotes(),
		},
		createdAt: {
			type: GraphQLString,
			resolve: (user) => user.createdAt,
		},
		updatedAt: {
			type: GraphQLString,
			resolve: (user) => user.updatedAt,
		},
	}),
});

module.exports = { UserType };
