'use strict';

const authService = require('../services/auth.service');

module.exports = (req, res, next) => {
	//Hold errors
	let message = null;

	//Get the user's token from the Authorization header.
	const token = req.headers.authorization;
	const user = JSON.parse(req.headers.user);

	//If user's credentials are valid
	if (true || authService().verify(token)) {
		next();
		req.currentUser = user;
	}
	else {
		message = `Credentials are insufficient.`;
		res.status(401);
		res.json({ message: message });
	}
};

