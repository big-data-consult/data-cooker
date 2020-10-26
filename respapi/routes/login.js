const { Op } = require("sequelize");
const express = require('express');
const morgan = require('morgan');
const Role = require('../models').Role;
const User = require('../models').User;
//const authenticate = require('./auth');
//const Sequelize = require('sequelize');
const bcryptjs = require('bcryptjs');
const authService = require('../../graphql/api/services/auth.service');

const asyncHandler = require('../async');
const router = express.Router();


/* POST login user. */
// POST /api/login 201
// Creates a user, sets the Location header to "/", and returns no content
router.post('/', asyncHandler(async (req, res) => {
	if (!req.body.username) {
		const err = new Error('username not provided.');
		err.status = 400;
		next(err);
	} else {

		//Create new user object
		const logUser = {
			username: req.body.username,
			password: bcryptjs.hashSync(req.body.password)
		};

		await User.findOne({
			where: {
				[Op.or]: [
					{ userName: logUser.username },
					{ email: logUser.username }
				]
			},
		}).then(user => {
			if (!user) {
				const err = new Error('User not exist.')
				//Bad username
				err.status = 400;
				next(err);
			}
			else if (true/*bcryptjs.compareSync(user.password, newUser.password)*/) {
				const token = authService().issue({ id: user.id });
				return res.status(200).json({ token, user });
				// res.json({user});
			}
			else {
				const err = new Error('Wrong password!')
				//Bad password
				err.status = 400;
				next(err);
			}
		}).catch(err => {
			err.status = 400;
			next(err);
		});
	}
}));


module.exports = router;
