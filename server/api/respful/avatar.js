const express = require('express');
const { Avatar } = require('../models');
// const authenticate = require('./auth');
// const { check, validationResult } = require('express-validator/check');
const asyncHandler = require('../services/async');

const router = express.Router();

// GET /api/avatars 200
// Returns a list of avatars (including the avatar that owns each source)
router.get('/', asyncHandler(async (req, res) => {
	const avatars = await Avatar.findAll({
		attributes: ['id', 'avatarData'],
	});
	res.header('Access-Control-Expose-Headers', 'X-Total-Count')
		.header('X-Total-Count', avatars.length)
		.json({ avatars });
}));


// GET /api/avatars/:id 200
// Returns a avatars (including the avatar that owns the avatar) for the provided avatar ID
router.get('/:id', asyncHandler(async (req, res) => {
	const avatar = await Avatar.findByPk(req.params.id, {
		attributes: ['id', 'avatarData'],
	});

	if (avatar) {
		res.json({ avatar });
	} else {
		res.status(404).json({ message: 'Avatar id not found.' });
	}
}));

module.exports = router;
