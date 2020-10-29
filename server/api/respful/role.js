const express = require('express');
const { Role } = require('../models');
// const authenticate = require('./auth');
// const { check, validationResult } = require('express-validator/check');
const asyncHandler = require('../services/async');

const router = express.Router();

// GET /api/roles 200
// Returns a list of roles (including the role that owns each source)
router.get('/', asyncHandler(async (req, res) => {
	const roles = await Role.findAll({
		attributes: ['id', 'roleName'],
	});
	res.header('Access-Control-Expose-Headers', 'X-Total-Count')
		.header('X-Total-Count', roles.length)
		.json({ roles });
}));


// GET /api/roles/:id 200
// Returns a roles (including the role that owns the role) for the provided role ID
router.get('/:id', asyncHandler(async (req, res) => {
	const role = await Role.findByPk(req.params.id, {
		attributes: ['id', 'roleName'],
	});

	if (role) {
		res.json({ role });
	} else {
		res.status(404).json({ message: 'Role id not found.' });
	}
}));

module.exports = router;
