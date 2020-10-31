const express = require('express');
// const morgan = require('morgan');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { User, Avatar, Role } = require('../models');
const authenticate = require('./auth');
// const Sequelize = require('sequelize');
// const { check, validationResult } = require('express-validator/check');
const asyncHandler = require('../services/async');

const router = express.Router();

/* GET current user */
router.get('/', asyncHandler(async (req, res) => {
	// Get query string params
	const sort = req.query.sort ? JSON.parse(req.query.sort) : ['email', 'ASC'];
	const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
	const queryFilter = req.query.filter ? JSON.parse(req.query.filter) : {};
	const filter = req.header('token') ? {
		email: JSON.parse(req.header('token')).username,
		// password : bcryptjs.hashSync(JSON.parse(req.headers('token')).password)
	} : queryFilter;

	const users = await User.findAll({
		attributes: ['id', 'userName', 'firstName', 'lastName', 'email', 'avatarId', 'roleId', 'permissionId'],
		include: [
			// {
			// 	model: Role,
			// 	as: 'role',
			// 	attributes: ['id', 'roleName'],
			// },
			// {
			// 	model: Avatar,
			// 	as: 'avatar',
			// 	attributes: ['id', 'avatarData'],
			// },
			{ all: true, nested: true }
		],
		where: filter,
		order: [sort],
		offset: range[0],
		limit: range[1] - range[0],
	});

	res.header('Access-Control-Expose-Headers', 'X-Total-Count')
		.header('X-Total-Count', users.length)
		.json({ users });
}));


// GET /api/users/:id 200
// Returns a user (including the user that owns the user) for the provided user ID
router.get('/:id', authenticate, asyncHandler(async (req, res) => {
	const user = await User.findByPk(req.params.id, {
		attributes: ['id', 'userName', 'firstName', 'lastName', 'email', 'avatarId', 'roleId', 'permissionId'],
		include: [
			{
				model: Role,
				as: 'role',
				attributes: ['id', 'roleName'],
				// },
				// {
				// 	model: avatarId,
				// 	as: 'avatar',
				// 	attributes: ['id', 'avatarData'],
			},
		],
	});

	if (user) {
		res.json({ user });
	} else {
		res.status(404).json({ message: 'User id not found.' });
	}
}));


/* POST create user. */
// POST /api/users 201
// Creates a user, sets the Location header to "/", and returns no content
router.post('/', asyncHandler(async (req, res, next) => {
	if (!req.body.userName || !req.body.email) {
		const err = new Error('UserName and email are needed.');
		err.status = 400;
		next(err);
	} else {
		// bcrypt will has the new user's password in the database
		const hashedPassword = bcryptjs.hashSync(req.body.password);

		// Create new user object
		const newUser = {
			userName: req.body.userName,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
			avatarId: req.body.avatarId,
			roleId: req.body.roleId,
			permissionId: 1, // permission is static
		};

		await User.findOne({ where: { email: newUser.email } })
			.then((user) => {
				if (user) {
					const err = new Error('This user already exists.');
					// Bad request
					err.status = 400;
					next(err);
					// If user doesn't exist
				} else {
					// Create new user
					User.create(newUser)
						.then((created) => {
							const { id } = created;
							if (created) {
								res.json({ id }).status(204).end();
							}
						})
						// Catch errors
						.catch((err) => {
							err.status = 400;
							next(err);
						});
				}
			})
			// Catch errors
			.catch((err) => {
				err.status = 400;
				next(err);
			});
	}
}));


// PUT /api/users/:id 204
// Updates a user and returns no content
router.put('/:id',
	// [
	// check('firstName')
	// 	.exists({ checkNull: true, checkFalsy: true })
	// 	.withMessage('Please provide a value for "first name"'),
	// check('lastName')
	// 	.exists({ checkNull: true, checkFalsy: true })
	// 	.withMessage('Please provide a value for "last name"'),
	// check('email')
	// 	.exists({ checkNull: true, checkFalsy: true })
	// 	.withMessage('Please provide a value for "email"')
	// 	.isEmail()
	// 	.withMessage('Please provide a valid email address for "email"'),
	// check('password')
	// 	.exists({ checkNull: true, checkFalsy: true })
	// 	.withMessage('Please provide a value for "password"')
	// 	.isLength({ min: 8, max: 20 })
	// 	.withMessage('Please provide a value for "password" that is between 8 and 20 characters in length'),
	// ],
	authenticate, asyncHandler(async (req, res) => {
		// Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		// If there are validation errors...
		if (!errors.isEmpty()) {
			// Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map((error) => error.msg);
			// Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {
			// find existing user
			const user = await User.findByPk(req.params.id, {
				attributes: ['id', 'userName', 'firstName', 'lastName', 'email', 'password', 'avatarId', 'roleId', 'permissionId'],
			});

			// if user exists
			if (user) {
				// if user permission matches current user's role
				if (req.currentUser.roleId !== 1 && user.id !== req.currentUser.id) {
					// Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: 'No permission to change user profile!' });
				}
				else if (req.currentUser.roleId !== 1) {
					res.status(403).json({ message: 'No permission to change user\'s role!' });
				}
				else {
					// Keep original value if any field is not provided
					const hashedPassword = req.body.password ? bcryptjs.hashSync(req.body.password) : user.password;
					const newRole = req.currentUser.roleId === 1 ? req.body.roleId : user.roleId;
					const updatedUser = {
						userName: req.body.userName ? req.body.userName : user.userName,
						firstName: req.body.firstName ? req.body.firstName : user.firstName,
						lastName: req.body.lastName ? req.body.lastName : user.lastName,
						email: req.body.email ? req.body.email : user.email,
						password: hashedPassword,
						avatarId: req.body.avatarId ? req.body.avatarId : user.avatarId,
						roleId: newRole
					};

					// update user details in Users table
					await User.update({
						userName: updatedUser.userName,
						firstName: updatedUser.firstName,
						lastName: updatedUser.lastName,
						email: updatedUser.email,
						password: updatedUser.password,
						avatarId: updatedUser.avatarId,
						roleId: updatedUser.roleId,
						permissionId: 1
					}, {
						where: {
							id: user.id,
						},
					}).then((updated) => {
						const { id } = updated;
						res.json({ id }).status(204).end();
					});
				}
			} else {
				res.status(404).json({ message: 'User not found.' });
			}
		}
	})
);


// DELETE /api/targets/ 204
// Deletes a target and returns no content
router.delete('/', authenticate, asyncHandler(async (req, res) => {
	const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

	// delete user from users table
	User.destroy({
		where: filter,
	}).then((deletedUser) => {
		res.status(204).end(deletedUser);
	});
}));


// DELETE /api/users/:id 204
// Deletes a user and returns no content
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
	// find existing user
	await User.findByPk(req.params.id, {
		attributes: ['id', 'userName', 'firstName', 'lastName', 'email', 'avatarId', 'roleId', 'permissionId'],
	}).then((user) => {
		// if user permission matches current user's role
		if (user.id === req.currentUser.id || req.currentUser.roleId === 1) {
			// delete user from Users table
			User.destroy(
				{
					where: {
						id: user.id,
					},
				}
			).then((deleted) => {
				const { id } = deleted;
				res.json({ id }).status(204).end();
			});
		} else {
			// Return a response with a 403 Client forbidden HTTP status code.
			res.status(403).json({ message: 'Access not permitted' });
		}
	});
}));


module.exports = router;
