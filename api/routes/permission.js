'use strict';

const express = require('express');
const Permission = require('../models').Role;
//const authenticate = require("./auth");
//const { check, validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');

const asyncHandler = require('../async');
const router = express.Router();

// GET /api/permissions 200
// Returns a list of permissions (including the permission that owns each source)
router.get('/', asyncHandler(async (req, res) => {
	const permissions = await Permission.findAll({
		attributes: ["id", "roleName"]
	});
	res.header('Access-Control-Expose-Headers', 'X-Total-Count')
		.header('X-Total-Count', permissions.length)
		.json({ permissions });
}));


// GET /api/permissions/:id 200
// Returns a permissions (including the permission that owns the permission) for the provided permission ID
router.get('/:id', asyncHandler(async (req, res) => {
	const permission = await Permission.findByPk(req.params.id, {
		attributes: ["id", "roleName"]
	});

	if (permission) {
		res.json({ permission });
	} else {
		res.status(404).json({ message: 'Permission id not found.' });
	}
}));

module.exports = router;