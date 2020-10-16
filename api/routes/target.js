'use strict';

const express = require('express');
//const Role = require('../models').Role;
const User = require('../models').User;
const Target = require('../models').Target;
const authenticate = require("./auth");
//const { check, validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');

const asyncHandler = require('../async');
const router = express.Router();

// GET /api/targets 200
// Returns a list of targets (including the target that owns each source)
router.get('/', asyncHandler(async (req, res) => {

	// Get query string params
	const sort = req.query.sort ? JSON.parse(req.query.sort) : ["targetData", "ASC"];
	const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
	const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

	// Get tagets controled by query string params
	const targets = await Target.findAll({
		attributes: [
			"id",
			"targetLabel",
			"targetData",
			"batchControlColumn",
			"batchControlSize",
			"batchControlNext",
			"batchProcessed",
			"batchProcessing",
			"batchMicroChunkCurrent",
			"batchScheduleType",
			"batchScheduleLast",
			"patternColumns",
			"groupByColumns",
			"groupByPattern",
			"groupByFlexible",
			"aggregateColumns",
			"aggregateFunctions",
			"suppoetSpVersions",
			"permissionId"
		],
		where: filter,
		order: [sort],
		offset: range[0],
		limit: range[1] - range[0]
	});
	res.header('Access-Control-Expose-Headers', 'X-Total-Count')
		.header('X-Total-Count', targets.length)
		.json({ targets });
}));


// GET /api/targets/:id 200
// Returns a targets (including the target that owns the target) for the provided target ID
router.get('/:id', asyncHandler(async (req, res) => {
	const target = await Target.findByPk(req.params.id, {
		attributes: [
			"id",
			"targetLabel",
			"targetData",
			"batchControlColumn",
			"batchControlSize",
			"batchControlNext",
			"batchProcessed",
			"batchProcessing",
			"batchMicroChunkCurrent",
			"batchScheduleType",
			"batchScheduleLast",
			"patternColumns",
			"groupByColumns",
			"groupByPattern",
			"groupByFlexible",
			"aggregateColumns",
			"aggregateFunctions",
			"suppoetSpVersions",
			"permissionId"
		]
	});

	if (target) {
		res.json({ target });
	} else {
		res.status(404).json({ message: 'Target id not found.' });
	}
}));


// POST /api/targets 201
// Creates a target, sets the Location header to "/", and returns no content
router.post('/',
	// [
	// 	check('targetLabel')
	// 		.exists({ checkNull: true, checkFalsy: true })
	// 		.withMessage('Please provide a value for "targetLabel"'),
	// 	check('targetData')
	// 		.exists({ checkNull: true, checkFalsy: true })
	// 		.withMessage('Please provide a value for "targetData"'),
	// 	check('batchControlColumn')
	// 		.exists({ checkNull: true, checkFalsy: true })
	// 		.withMessage('Please provide a value for "batchControlColumn"')
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
		}
		// Get the target from the request body.
		const target = req.body;

		// check if target already exists in Targets table
		const existingTarget = await Target.findOne({
			where: {
				targetData: target.targetData
			}
		});

		// create new target if not already in Targets table
		if (!existingTarget) {

			// Create target
			Target.create({
				//id: target.id,
				targetLabel: target.targetLabel,
				targetData: target.targetData,
				batchControlColumn: target.batchControlColumn,
				batchControlSize: target.batchControlSize,
				batchControlNext: target.batchControlNext,
				batchProcessed: target.batchProcessed,
				batchProcessing: target.batchProcessing,
				batchMicroChunkCurrent: target.batchMicroChunkCurrent,
				batchScheduleType: target.batchScheduleType,
				batchScheduleLast: target.batchScheduleLast,
				patternColumns: target.patternColumns,
				groupByColumns: target.groupByColumns,
				groupByPattern: target.groupByPattern,
				groupByFlexible: target.groupByFlexible,
				aggregateColumns: target.aggregateColumns,
				aggregateFunctions: target.aggregateFunctions,
				suppoetSpVersions: target.suppoetSpVersions,
				permissionId: 2
			});

			// Set the status to 201 Created and end the response.
			res.location('/').status(201).end();
		} else {
			res.status(400).json({ message: `Target data '${target.targetData}' already exists` });
		}
	}
	));


// PUT /api/targets/:id 204
// Updates a target and returns no content
router.put('/:id',
	// [
	// check('targetLabel')
	// 	.exists({ checkNull: true, checkFalsy: true })
	// 	.withMessage('Please provide a value for "targetLabel"'),
	// check('targetData')
	// 	.exists({ checkNull: true, checkFalsy: true })
	// 	.withMessage('Please provide a value for "targetData"'),
	// check('batchControlColumn')
	// 	.exists({ checkNull: true, checkFalsy: true })
	// 	.withMessage('Please provide a value for "batchControlColumn"')
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

			// find existing target
			const target = await Target.findByPk(req.params.id, {
				attributes: [
					"id",
					"targetLabel",
					"targetData",
					"batchControlColumn",
					"batchControlSize",
					"batchControlNext",
					"batchProcessed",
					"batchProcessing",
					"batchMicroChunkCurrent",
					"batchScheduleType",
					"batchScheduleLast",
					"patternColumns",
					"groupByColumns",
					"groupByPattern",
					"groupByFlexible",
					"aggregateColumns",
					"aggregateFunctions",
					"suppoetSpVersions",
					"permissionId"
				]
			});

			// if target exists
			if (target) {
				// if target permission matches current user's role
				if (target.permissionId >= req.currentUser.roleId) {
					// Keep original value if field is not provided
					target.targetLabel = req.body.targetLabel ? req.body.targetLabel : target.targetLabel;
					target.targetData = req.body.targetData ? req.body.targetData : target.targetData;
					target.batchControlColumn = req.body.batchControlColumn ? req.body.batchControlColumn : target.batchControlColumn;
					target.batchControlSize = req.body.batchControlSize ? req.body.batchControlSize : target.batchControlSize;
					target.batchControlNext = req.body.batchControlNext ? req.body.batchControlNext : target.batchControlNext;
					target.batchProcessed = req.body.batchProcessed ? req.body.batchProcessed : target.batchProcessed;
					target.batchProcessing = req.body.batchProcessing ? req.body.batchProcessing : target.batchProcessing;
					target.batchMicroChunkCurrent = req.body.batchMicroChunkCurrent ? req.body.batchMicroChunkCurrent : target.batchMicroChunkCurrent;
					target.batchScheduleType = req.body.batchScheduleType ? req.body.batchScheduleType : target.batchScheduleType;
					target.batchScheduleLast = req.body.batchScheduleLast ? req.body.batchScheduleLast : target.batchScheduleLast;
					target.patternColumns = req.body.patternColumns ? req.body.patternColumns : target.patternColumns;
					target.groupByColumns = req.body.groupByColumns ? req.body.groupByColumns : target.groupByColumns;
					target.groupByPattern = req.body.groupByPattern ? req.body.groupByPattern : target.groupByPattern;
					target.groupByFlexible = req.body.groupByFlexible ? req.body.groupByFlexible : target.groupByFlexible;
					target.aggregateColumns = req.body.aggregateColumns ? req.body.aggregateColumns : target.aggregateColumns;
					target.aggregateFunctions = req.body.aggregateFunctions ? req.body.aggregateFunctions : target.aggregateFunctions;
					target.suppoetSpVersions = req.body.suppoetSpVersions ? req.body.suppoetSpVersions : target.suppoetSpVersions;

					// update target details in Targets table
					const updatedTarget = await Target.update({
						//id: target.id,
						targetLabel: target.targetLabel,
						targetData: target.targetData,
						batchControlColumn: target.batchControlColumn,
						batchControlSize: target.batchControlSize,
						batchControlNext: target.batchControlNext,
						batchProcessed: target.batchProcessed,
						batchProcessing: target.batchProcessing,
						batchMicroChunkCurrent: target.batchMicroChunkCurrent,
						batchScheduleType: target.batchScheduleType,
						batchScheduleLast: target.batchScheduleLast,
						patternColumns: target.patternColumns,
						groupByColumns: target.groupByColumns,
						groupByPattern: target.groupByPattern,
						groupByFlexible: target.groupByFlexible,
						aggregateColumns: target.aggregateColumns,
						aggregateFunctions: target.aggregateFunctions,
						suppoetSpVersions: target.suppoetSpVersions,
						permissionId: 2
					}, {
						where: {
							id: target.id
						}
					});

					const id = target.id;

					if (updatedTarget) {
						res.json({ id }).status(204).end();
					}

				} else {
					// Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: "Access not permitted" });
				}
			} else {
				res.status(404).json({ message: "Target not found." });
			}
		}
	}
	));


// DELETE /api/targets/:id 204
// Deletes a target and returns no content
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {

	// find existing target
	const target = await Target.findByPk(req.params.id, {
		attributes: [
			"id",
			"targetLabel",
			"targetData",
			"batchControlColumn",
			"batchControlSize",
			"batchControlNext",
			"batchProcessed",
			"batchProcessing",
			"batchMicroChunkCurrent",
			"batchScheduleType",
			"batchScheduleLast",
			"patternColumns",
			"groupByColumns",
			"groupByPattern",
			"groupByFlexible",
			"aggregateColumns",
			"aggregateFunctions",
			"suppoetSpVersions",
			"permissionId"
		]
	});

	// if target exists
	if (target) {
		// if target permission matches current user's role
		if (target.permissionId >= req.currentUser.roleId) {
			// delete target from Targets table
			const deletedTarget = await Target.destroy(
				{
					where: {
						id: target.id
					}
				}
			);

			if (deletedTarget) {
				res.status(204).end();
			}

		} else {
			// Return a response with a 403 Client forbidden HTTP status code.
			res.status(403).json({ message: "Access not permitted" });
		}
	} else {
		res.status(404).json({ message: "Target not found." });
	}
})
);


module.exports = router;