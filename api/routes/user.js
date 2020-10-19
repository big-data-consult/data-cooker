const express = require('express');
const morgan = require('morgan');
const Role = require('../models').Role;
const User = require('../models').User;
const authenticate = require('./auth');
//const Sequelize = require('sequelize');
const { check, validationResult } = require('express-validator');
//const { check, validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');

const asyncHandler = require('../async');
const router = express.Router();

/* GET current user*/
router.get('/', asyncHandler(async (req, res) => {

	// Get query string params
	const sort = req.query.sort ? JSON.parse(req.query.sort) : ["emailAddress", "ASC"];
	const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
	const filter = req.header('token') ? {
		"emailAddress": JSON.parse(req.header("token")).username,
		//"password" : bcryptjs.hashSync(JSON.parse(req.headers("token")).password)
	} : (req.query.filter ? JSON.parse(req.query.filter) : {});

	const users = await User.findAll({
		attributes: ["id", "firstName", "lastName", "emailAddress", "roleId", "permissionId"],
		// include: [
		// 	{
		// 		model: Role,
		// 		as: "role",
		// 		attributes: ["roleId", "roleName"]
		// 	}
		// ],
		where: filter,
		order: [sort],
		offset: range[0],
		limit: range[1] - range[0]
	});

	res.header('Access-Control-Expose-Headers', 'X-Total-Count')
		.header('X-Total-Count', users.length)
		.json({ users });
}));


// GET /api/users/:id 200
// Returns a user (including the user that owns the user) for the provided user ID
router.get('/:id',
	authenticate,
	asyncHandler(async (req, res) => {
		const user = await User.findByPk(req.params.id, {
			attributes: ["id", "firstName", "lastName", "emailAddress", "roleId", "permissionId"],
			// include: [
			// 	{
			// 		model: Role,
			// 		as: "role",
			// 		attributes: ["roleId", "roleName"]
			// 	}
			// ]
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
router.post('/', asyncHandler(async (req, res) => {
	if (!req.body.emailAddress) {
		const err = new Error('Please enter sufficient credentials.');
		err.status = 400;
		next(err);
	} else {

		//Create new user object
		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			emailAddress: req.body.emailAddress,
			password: req.body.password,
			roleId: req.body.roleId,
			permissionId: 1 // permission is static
		};
		//bcrypt will has the new user's password in the database
		newUser.password = bcryptjs.hashSync(newUser.password);

		await User.findOne({ where: { emailAddress: newUser.emailAddress } })
			.then(user => {
				if (user) {
					const err = new Error('This user already exists.')
					//Bad request
					err.status = 400;
					next(err);
					//If user doesn't exist
				} else {
					//Create new user
					User.create(newUser)
						.then(() => {
							//set the location header
							res.location('/');
							//create status of no content
							res.status(201).end();
						})
						//Catch errors
						.catch(err => {
							err.status = 400;
							next(err);
						});
				}
			})
			//Catch errors
			.catch(err => {
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
	// check('emailAddress')
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
	authenticate,
	asyncHandler(async (req, res) => {
		// Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		// If there are validation errors...
		if (!errors.isEmpty()) {
			// Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map(error => error.msg);
			// Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {

			// find existing user
			const user = await User.findByPk(req.params.id, {
				attributes: ["id", "firstName", "lastName", "emailAddress", "roleId", "permissionId"]
			});

			// if user exists
			if (user) {
				// if user permission matches current user's role
				if (user.permissionId >= req.currentUser.roleId || user.id == req.currentUser.id) {

					// Keep original value if field is not provided
					user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
					user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
					user.emailAddress = req.body.emailAddress ? req.body.emailAddress : user.emailAddress;

					// Hash the new user's password.
					user.password = req.body.password ? bcryptjs.hashSync(req.body.password) : user.password;

					// Only admin can change user's role
					if (req.currentUser.roleId == 1) {
						user.roleId = req.body.roleId
					}

					// update user details in Users table
					const updatedUser = await User.update({
						firstName: user.firstName,
						lastName: user.lastName,
						emailAddress: user.emailAddress,
						password: user.password,
						roleId: user.roleId,
						permissionId: 1
					}, {
						where: {
							id: user.id
						}
					});

					const id = user.id;

					if (updatedUser) {
						res.json({ id }).status(204).end();
					}

				} else {
					// Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: "Access not permitted" });
				}
			} else {
				res.status(404).json({ message: "User not found." });
			}
		}
	}));


// DELETE /api/targets/ 204
// Deletes a target and returns no content
router.delete('/',
	authenticate,
	asyncHandler(async (req, res) => {

		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// delete user from users table
		User.destroy({
			where: filter
		}).then(deletedUser => {
			res.status(204).end();
		});
	})
);


// DELETE /api/users/:id 204
// Deletes a user and returns no content
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {

	// find existing user
	const user = await User.findByPk(req.params.id, {
		attributes: ["id", "firstName", "lastName", "emailAddress", "roleId", "permissionId"]
	});
	// if user exists
	if (user) {
		// if user permission matches current user's role
		if (user.id == req.currentUser.id || req.currentUser.roleId == 1) {
			// delete user from Users table
			const deletedUser = User.destroy(
				{
					where: {
						id: user.id
					}
				}
			);

			if (deletedUser) {
				res.status(204).end();
			}

		} else {
			// Return a response with a 403 Client forbidden HTTP status code.
			res.status(403).json({ message: "Access not permitted" });
		}
	} else {
		res.status(404).json({ message: "User not found." });
	}
}));


module.exports = router;
