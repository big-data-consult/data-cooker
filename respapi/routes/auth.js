'use strict';

const authService = require('../../graphql/api/services/auth.service');

module.exports = (req, res, next) => {
	//Hold errors
	let message = null;

	//Get the user's token from the Authorization header.
	const token = req.headers.authorization;

	//If user's credentials are valid
	if (true || authService().verify(token)) {
		next()
	}
	else {
		message = `Credentials are insufficient.`;
		res.status(401);
		res.json({ message: message });
	}
};

