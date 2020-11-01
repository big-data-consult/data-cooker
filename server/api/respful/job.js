const express = require('express');
const { check, validationResult } = require('express-validator');
const { Job } = require('../models');
const authenticate = require('./auth');
// const { check, validationResult } = require('express-validator/check');

const asyncHandler = require('../services/async');
const router = express.Router();

// GET /api/jobs 200
// Returns a list of jobs (including the job that owns each task)
router.get('/', asyncHandler(async (req, res) => {

	// Get query string params
	const sort = req.query.sort ? JSON.parse(req.query.sort) : ['jobDescription', 'ASC'];
	const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
	const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

	// Get tagets controled by query string params
	const jobs = await Job.findAll({
		attributes: [
			'id',
			'jobName',
			'jobDescription',
			'jobStatus',
			'jobEnabled',
			'repeatSchedule',
			'scheduleType',
			'scheduleCron',
			'scheduleBegin',
			'scheduleEnd',
			'nextSchedule',
			'lastSchedule',
			'permissionId',
		],
		where: filter,
		order: [sort],
		offset: range[0],
		limit: range[1] - range[0],
	});
	res.header('Access-Control-Expose-Headers', 'X-Total-Count')
		.header('X-Total-Count', jobs.length)
		.json({ jobs });
}));


// GET /api/jobs/:id 200
// Returns a jobs (including the job that owns the job) for the provided job ID
router.get('/:id', asyncHandler(async (req, res) => {
	const job = await Job.findByPk(req.params.id, {
		attributes: [
			'id',
			'jobName',
			'jobDescription',
			'jobStatus',
			'jobEnabled',
			'repeatSchedule',
			'scheduleType',
			'scheduleCron',
			'scheduleBegin',
			'scheduleEnd',
			'nextSchedule',
			'lastSchedule',
			'permissionId',
		],
	});

	if (job) {
		res.json({ job });
	} else {
		res.status(404).json({ message: 'Job id not found.' });
	}
}));


// POST /api/jobs 201
// Creates a job, sets the Location header to "/", and returns no content
router.post('/',
	[
		check('jobName')
			.exists({ checkNull: true, checkFalsy: true })
			.withMessage('Please provide a value for "jobName"'),
		// check('jobDescription')
		// 	.exists({ checkNull: true, checkFalsy: true })
		// 	.withMessage('Please provide a value for "jobDescription"'),
		// check('jobStatus')
		// 	.exists({ checkNull: true, checkFalsy: true })
		// 	.withMessage('Please provide a value for "jobStatus"'),
	],
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
		}
		else {
			// Get the job from the request body.
			const job = req.body;
			// check if job already exists in Jobs table
			const existingJob = Job.findOne({
				where: {
					jobDescription: job.jobDescription
				},
			});
			// create new job if not already in Jobs table
			if (true || existingJob === null) {
				// Create job
				await Job.create({
					// id: job.id,
					jobName: job.jobName,
					jobDescription: job.jobDescription,
					jobStatus: job.jobStatus,
					jobEnabled: job.jobEnabled,
					repeatSchedule: job.repeatSchedule,
					scheduleType: job.scheduleType,
					scheduleCron: job.scheduleCron,
					scheduleBegin: job.scheduleBegin,
					scheduleEnd: job.scheduleEnd,
					nextSchedule: job.nextSchedule,
					lastSchedule: job.lastSchedule,
					permissionId: 2,
				}).then((created) => {
					const { id } = created;
					res.json({ id }).status(201).end();
				})
			}
			else {
				res.status(400).json({ message: `Job data '${job.jobDescription}' already exists` });
			}
		}
	})
);


// PUT /api/jobs/:id 204
// Updates a job and returns no content
router.put('/:id',
	[
		check('jobName')
			.exists({ checkNull: true, checkFalsy: true })
			.withMessage('Please provide a value for "jobName"'),
		// check('jobDescription')
		// 	.exists({ checkNull: true, checkFalsy: true })
		// 	.withMessage('Please provide a value for "jobDescription"'),
		// check('jobStatus')
		// 	.exists({ checkNull: true, checkFalsy: true })
		// 	.withMessage('Please provide a value for "jobStatus"'),
	],
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
			// find existing job
			Job.findByPk(req.params.id, {
				attributes: [
					'id',
					'jobName',
					'jobDescription',
					'jobStatus',
					'jobEnabled',
					'repeatSchedule',
					'scheduleType',
					'scheduleCron',
					'scheduleBegin',
					'scheduleEnd',
					'nextSchedule',
					'lastSchedule',
					'permissionId',
				],
			}).then((job) => {
				// if job permission matches current user's role
				if (job.permissionId >= req.currentUser.roleId) {
					// Keep original value if field is not provided
					const updatedTrget = {
						jobName: req.body.jobName ? req.body.jobName : job.jobName,
						jobDescription: req.body.jobDescription ? req.body.jobDescription : job.jobDescription,
						jobStatus: req.body.jobStatus ? req.body.jobStatus : job.jobStatus,
						jobEnabled: req.body.jobEnabled ? req.body.jobEnabled : job.jobEnabled,
						repeatSchedule: req.body.repeatSchedule ? req.body.repeatSchedule : job.repeatSchedule,
						scheduleType: req.body.scheduleType ? req.body.scheduleType : job.scheduleType,
						scheduleCron: req.body.scheduleCron ? req.body.scheduleCron : job.scheduleCron,
						scheduleBegin: req.body.scheduleBegin ? req.body.scheduleBegin : job.scheduleBegin,
						scheduleEnd: req.body.scheduleEnd ? req.body.scheduleEnd : job.scheduleEnd,
						nextSchedule: req.body.nextSchedule ? req.body.nextSchedule : job.nextSchedule,
						lastSchedule: req.body.lastSchedule ? req.body.lastSchedule : job.lastSchedule,
					};

					// update job details in Jobs table
					Job.update({
						// id: job.id,
						jobName: updatedTrget.jobName,
						jobDescription: updatedTrget.jobDescription,
						jobStatus: updatedTrget.jobStatus,
						jobEnabled: updatedTrget.jobEnabled,
						repeatSchedule: updatedTrget.repeatSchedule,
						scheduleType: updatedTrget.scheduleType,
						scheduleCron: updatedTrget.scheduleCron,
						scheduleBegin: updatedTrget.scheduleBegin,
						scheduleEnd: updatedTrget.scheduleEnd,
						nextSchedule: updatedTrget.nextSchedule,
						lastSchedule: updatedTrget.lastSchedule,
						permissionId: 2,
					}, {
						where: {
							id: job.id,
						},
					}).then((updated) => {
						const { id } = updated;
						res.json({ id }).status(204).end();
					});
				} else {
					// Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: 'No permission to modify the job.' });
				}
			});
		}
	})
);


// DELETE /api/jobs/ 204
// Deletes a job and returns no content
router.delete('/', authenticate, asyncHandler(async (req, res) => {
	const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

	// delete job from Jobs table
	Job.destroy({
		where: filter
	}).then((deletedJob) => {
		res.status(204).end(deletedJob);
	});
}));


// DELETE /api/jobs/:id 204
// Deletes a job and returns no content
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
	// find existing job
	Job.findByPk(req.params.id, {
		attributes: [
			'id',
			'jobName',
			'jobDescription',
			'jobStatus',
			'jobEnabled',
			'repeatSchedule',
			'scheduleType',
			'scheduleCron',
			'scheduleBegin',
			'scheduleEnd',
			'nextSchedule',
			'lastSchedule',
			'permissionId'
		]
	}).then((job) => {
		// if job permission matches current user's role
		if (job.permissionId >= req.currentUser.roleId) {
			// delete job from Jobs table
			Job.destroy({
				where: {
					id: job.id
				}
			}).then((deleted) => {
				const { id } = deleted;
				res.json({ id }).status(204).end();
			});
		} else {
			// Return a response with a 403 Client forbidden HTTP status code.
			res.status(403).json({ message: 'No permission to delete job.' });
		}
	});
}));

module.exports = router;
