'use strict';

const express = require('express');
// const Role = require('../models').Role;
const User = require('../models').User;
const Target = require('../models').Target;
const Source = require('../models').Source;
const authenticate = require("./auth");
const { check, validationResult } = require("express-validator");
//const { check, validationResult } = require("express-validator/check");

const asyncHandler = require('../services/async');
const router = express.Router();

// GET /api/sources 200
// Returns a list of sources (including the target that owns each source)
router.get('/', asyncHandler(async (req, res) => {

	// Get query string params
	const sort = req.query.sort ? JSON.parse(req.query.sort) : ["sourceData", "ASC"];
	const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
	const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

	// // Get current taget from url query string
	// const currentTargetId = req.query.targetId ? req.query.targetId : 1;
	// filter["targetId"] = currentTargetId;

	// Get sources of current taget specified by query string
	const sources = await Source.findAll({
		attributes: [
			"id",
			"targetId",
			"sourceLabel",
			"sourceData",
			"sourceEnabled",
			"sourceReadyTime",
			"sourceCheckTime",
			"sourceCheckQuery",
			"patternDefault",
			"patternFlexible",
			"transformation",
			"permissionId"
		],
		include: [
			{
				model: Target,
				as: "target",
				attributes: ["id", "targetLabel", "targetData"]
			}
		],
		where: filter,
		order: [sort],
		offset: range[0],
		limit: range[1] - range[0]
	});
	res.header('Access-Control-Expose-Headers', 'X-Total-Count')
		.header('X-Total-Count', sources.length)
		.json({ sources });
}));


// GET /api/sources/:id 200
// Returns a source (including the target that owns the source) for the provided source ID
router.get('/:id', asyncHandler(async (req, res) => {
	const source = await Source.findByPk(req.params.id, {
		attributes: [
			"id",
			"targetId",
			"sourceLabel",
			"sourceData",
			"sourceEnabled",
			"sourceReadyTime",
			"sourceCheckTime",
			"sourceCheckQuery",
			"patternDefault",
			"patternFlexible",
			"transformation",
			"permissionId"
		],
		include: [
			{
				model: Target,
				as: 'target',
				attributes: ["id", "targetLabel", "targetData"]
			}
		]
	});

	if (source) {
		res.json({ source });
	} else {
		res.status(404).json({ message: 'Source id not found.' });
	}
}));


// POST /api/sources 201
// Creates a source, sets the Location header to the URI for the source, and returns no content
router.post('/',
	// [
	// 	check('sourceData')
	// 		.exists({ checkNull: true, checkFalsy: true })
	// 		.withMessage('Please provide a value for "sourceData"'),
	// 	check('transformation')
	// 		.exists({ checkNull: true, checkFalsy: true })
	// 		.withMessage('Please provide a value for "transformation"'),
	// ],
	authenticate, asyncHandler(async (req, res) => {
		// Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		// If there are validation errors...
		if (!errors.isEmpty()) {
			// Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map(error => error.msg);
			// Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {

			// get the target from the request body.
			const source = req.body;

			// Create target
			const addedSource = await Source.create({
				//id: source.id,
				targetId: source.targetId,
				sourceLabel: source.sourceLabel,
				sourceData: source.sourceData,
				sourceEnabled: source.sourceEnabled,
				sourceReadyTime: source.sourceReadyTime,
				sourceCheckTime: source.sourceCheckTime,
				sourceCheckQuery: source.sourceCheckQuery,
				patternDefault: source.patternDefault,
				patternFlexible: source.patternFlexible,
				transformation: source.transformation,
				permissionId: 2
			});

			// get new source id for Location header
			const id = addedSource.id;

			// Set the status to 201 Created, set Location header, and end the response.
			res.json({ id }).location(`/sources/${id}`).status(201).end();
		}
	}));


// PUT /api/sources/:id 204
// Updates a source and returns no content
router.put('/:id',
	// [
	// 	check('sourceData')
	// 		.exists({ checkNull: true, checkFalsy: true })
	// 		.withMessage('Please provide a value for "sourceData"'),
	// 	check('transformation')
	// 		.exists({ checkNull: true, checkFalsy: true })
	// 		.withMessage('Please provide a value for "transformation"'),
	// ],
	authenticate, asyncHandler(async (req, res) => {
		// Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		// If there are validation errors...
		if (!errors.isEmpty()) {
			// Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map(error => error.msg);
			// Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {

			// find existing source
			const source = await Source.findByPk(req.params.id, {
				attributes: [
					"id",
					"targetId",
					"sourceLabel",
					"sourceData",
					"sourceEnabled",
					"sourceReadyTime",
					"sourceCheckTime",
					"sourceCheckQuery",
					"patternDefault",
					"patternFlexible",
					"transformation",
					"permissionId"
				],
				include: [
					{
						model: Target,
						as: "target",
						attributes: ["id", "targetLabel", "targetData"]
					}
				]
			});

			// if source exists
			if (source) {
				// if source permission matches current user's role
				if (source.permissionId >= req.currentUser.roleId) {
					// Keep original value if field is not provided
					source.targetId = req.body.targetId ? req.body.targetId : source.targetId,
						source.sourceLabel = req.body.sourceLabel ? req.body.sourceLabel : source.sourceLabel,
						source.sourceData = req.body.sourceData ? req.body.sourceData : source.sourceData,
						source.sourceEnabled = req.body.sourceEnabled ? req.body.sourceEnabled : source.sourceEnabled,
						source.sourceReadyTime = req.body.sourceReadyTime ? req.body.sourceReadyTime : source.sourceReadyTime,
						source.sourceCheckTime = req.body.sourceCheckTime ? req.body.sourceCheckTime : source.sourceCheckTime,
						source.sourceCheckQuery = req.body.sourceCheckQuery ? req.body.sourceCheckQuery : source.sourceCheckQuery,
						source.patternDefault = req.body.patternDefault ? req.body.patternDefault : source.patternDefault,
						source.patternFlexible = req.body.patternFlexible ? req.body.patternFlexible : source.patternFlexible,
						source.transformation = req.body.transformation ? req.body.transformation : source.transformation,
						source.permissionId = req.body.permissionId ? req.body.permissionId : source.permissionId

					// update source details in Sources table
					const updatedSource = await Source.update({
						targetId: source.targetId,
						sourceLabel: source.sourceLabel,
						sourceData: source.sourceData,
						sourceEnabled: source.sourceEnabled,
						sourceReadyTime: source.sourceReadyTime,
						sourceCheckTime: source.sourceCheckTime,
						sourceCheckQuery: source.sourceCheckQuery,
						patternDefault: source.patternDefault,
						patternFlexible: source.patternFlexible,
						transformation: source.transformation,
						permissionId: 2
					}, {
						where: {
							id: source.id
						}
					});

					const id = source.id;

					if (updatedSource) {
						res.json({ id }).status(204).end();
					}

				} else {
					// Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: "Access not permitted" });
				}
			} else {
				res.status(404).json({ message: "Source not found." });
			}
		}
	}
	));


// DELETE /api/targets/ 204
// Deletes a target and returns no content
router.delete('/', authenticate, asyncHandler(async (req, res) => {

	const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

	// delete target from Targets table
	Source.destroy({
		where: filter
	}).then(deletedSource => {
		res.status(204).end();
	});
}));


// DELETE /api/sources/:id 204
// Deletes a source and returns no content
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {

	// find existing source
	const source = await Source.findByPk(req.params.id, {
		attributes: [
			"id",
			"targetId",
			"sourceLabel",
			"sourceData",
			"sourceEnabled",
			"sourceReadyTime",
			"sourceCheckTime",
			"sourceCheckQuery",
			"patternDefault",
			"patternFlexible",
			"transformation",
			"permissionId"
		],
		include: [
			{
				model: Target,
				as: "target",
				attributes: ["id", "targetLabel", "targetData"]
			}
		]
	}).then(source => {
		// if source permission matches current user's role
		if (source.permissionId >= req.currentUser.roleId) {
			// delete source from Sources table
			const deletedSource = Source.destroy(
				{
					where: {
						id: source.id
					}
				}
			).thrn(deletedSource => {
				res.status(204).end();
			})
		} else {
			// Return a response with a 403 Client forbidden HTTP status code.
			res.status(403).json({ message: "Access not permitted" });
		}
	})
}));


module.exports = router;
