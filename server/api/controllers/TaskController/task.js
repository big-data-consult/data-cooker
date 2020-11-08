const { validationResult } = require('express-validator');
const { Job, Task, Plugin } = require('../../models');

const TaskController = () => {
	const getTasks = async (req, res) => {
		//  Get query string params
		const sort = req.query.sort ? JSON.parse(req.query.sort) : ['taskName', 'ASC'];
		const range = req.query.range ? JSON.parse(req.query.range) : [0, 50];
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		//  //  Get current taget from url query string
		//  const currentJobId = req.query.jobId ? req.query.jobId : 1;
		//  filter['jobId'] = currentJobId;

		//  Get tasks of current taget specified by query string
		const tasks = await Task.findAll({
			attributes: [
				'id',
				'jobId',
				'taskNo',
				'taskName',
				'taskDescription',
				'taskWorker',
				'taskStatus',
				'nextTaskOnSuccess',
				'nextTaskOnFailure',
				'lastScheduledTime',
				'lastCompleteTime',
				// 'permissionId',
			],
			include: [
				{
					model: Plugin,
					as: 'plugin',
					attributes: ['id', 'pluginName'],
				},
				{
					model: Job,
					as: 'job',
					attributes: ['id', 'jobName', 'scheduleType'],
				},
				// { all: true, nested: true }
			],
			where: filter,
			order: [sort],
			offset: range[0],
			limit: range[1] - range[0],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', tasks.length)
			.json({ tasks });
	};


	const getTask = async (req, res) => {
		const task = await Task.findByPk(req.params.id, {
			attributes: [
				'id',
				'jobId',
				'taskNo',
				'taskName',
				'taskDescription',
				'taskWorker',
				'taskStatus',
				'nextTaskOnSuccess',
				'nextTaskOnFailure',
				'lastScheduledTime',
				'lastCompleteTime',
				// 'permissionId',
			],
			include: [
				{
					model: Job,
					as: 'job',
					attributes: ['id', 'jobName', 'scheduleType'],
				},
			],
		});

		if (task) {
			res.json({ task });
		} else {
			res.status(404).json({ message: 'Task id not found.' });
		}
	};


	const postTask = async (req, res) => {
		//  Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		//  If there are validation errors...
		if (!errors.isEmpty()) {
			//  Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map(error => error.msg);
			//  Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {
			//  get the job from the request body.
			const task = req.body;

			//  Create job
			const addedTask = await Task.create({
				// id: task.id,
				jobId: task.jobId,
				taskNo: task.taskNo,
				taskName: task.taskName,
				taskDescription: task.taskDescription,
				taskWorker: task.taskWorker ? task.taskWorker : Date.now(),
				taskStatus: task.taskStatus,
				nextTaskOnSuccess: task.nextTaskOnSuccess,
				nextTaskOnFailure: task.nextTaskOnFailure,
				lastScheduledTime: task.lastScheduledTime,
				lastCompleteTime: task.lastCompleteTime,
				// permissionId: 2,
			}).then((created) => {
				const { id } = created;
				// res.json({ id }).status(201).end();
				//  Set the status to 201 Created, set Location header, and end the response.
				res.json({ id }).location(`/tasks/${id}`).status(201).end();
			})
		}
	};


	const putTask = async (req, res) => {
		//  Attempt to get the validation result from the Request object.
		const errors = validationResult(req);

		//  If there are validation errors...
		if (!errors.isEmpty()) {
			//  Use the Array `map()` method to get a list of error messages.
			const errorMessages = errors.array().map(error => error.msg);
			//  Return the validation errors to the client.
			return res.status(400).json({ errors: errorMessages });
		} else {
			//  find existing task
			const task = await Task.findByPk(req.params.id, {
				attributes: [
					'id',
					'jobId',
					'taskNo',
					'taskName',
					'taskDescription',
					'taskWorker',
					'taskStatus',
					'nextTaskOnSuccess',
					'nextTaskOnFailure',
					'lastScheduledTime',
					'lastCompleteTime',
					// 'permissionId',
				],
				include: [
					{
						model: Job,
						as: 'job',
						attributes: ['id', 'jobName', 'scheduleType']
					}
				]
			});

			//  if task exists
			if (task) {
				//  if task permission matches current user's role
				if (req.token.roleId === 1) {
					//  Keep original value if field is not provided
					const updatedTask = {
						jobId: req.body.jobId ? req.body.jobId : task.jobId,
						taskNo: req.body.taskNo ? req.body.taskNo : task.taskNo,
						taskName: req.body.taskName ? req.body.taskName : task.taskName,
						taskDescription: req.body.taskDescription ? req.body.taskDescription : task.taskDescription,
						taskWorker: req.body.taskWorker ? req.body.taskWorker : task.taskWorker,
						taskStatus: req.body.taskStatus ? req.body.taskStatus : task.taskStatus,
						nextTaskOnSuccess: req.body.nextTaskOnSuccess ? req.body.nextTaskOnSuccess : task.nextTaskOnSuccess,
						nextTaskOnFailure: req.body.nextTaskOnFailure ? req.body.nextTaskOnFailure : task.nextTaskOnFailure,
						lastScheduledTime: req.body.lastScheduledTime ? req.body.lastScheduledTime : task.lastScheduledTime,
						lastCompleteTime: req.body.lastCompleteTime ? req.body.lastCompleteTime : task.lastCompleteTime,
						// permissionId: req.body.permissionId ? req.body.permissionId : task.permissionId,
					};

					//  update task details in Tasks table
					await Task.update({
						jobId: updatedTask.jobId,
						taskNo: updatedTask.taskNo,
						taskName: updatedTask.taskName,
						taskDescription: updatedTask.taskDescription,
						taskWorker: updatedTask.taskWorker,
						taskStatus: updatedTask.taskStatus,
						nextTaskOnSuccess: updatedTask.nextTaskOnSuccess,
						nextTaskOnFailure: updatedTask.nextTaskOnFailure,
						lastScheduledTime: updatedTask.lastScheduledTime,
						lastCompleteTime: updatedTask.lastCompleteTime,
						// permissionId: 2
					}, {
						where: {
							id: task.id
						}
					}).then((updated) => {
						const { id } = updated;
						res.json({ id }).status(204).end();
					});
				} else {
					//  Return a response with a 403 Client forbidden HTTP status code.
					res.status(403).json({ message: 'Access not permitted' });
				}
			} else {
				res.status(404).json({ message: 'Task not found.' });
			}
		}
	};


	const deleteTasks = async (req, res) => {
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// Only the user with admin role can do multi-deletion
		if (req.token.roleId !== 1) {
			res.status(403).json({ message: 'Only user with admin role can delete multiple rows!' });
		} else {
			//  delete job from Jobs table
			Task.destroy({
				where: filter
			}).then(deleted => {
				const { id } = deleted;
				res.json({ id }).status(204).end();
			});
		}
	};


	const deleteTask = async (req, res) => {
		//  find existing task
		const task = await Task.findByPk(req.params.id, {
			attributes: [
				'id',
				'jobId',
				'taskNo',
				'taskName',
				'taskDescription',
				'taskWorker',
				'taskStatus',
				'nextTaskOnSuccess',
				'nextTaskOnFailure',
				'lastScheduledTime',
				'lastCompleteTime',
				// 'permissionId'
			],
			include: [
				{
					model: Job,
					as: 'job',
					attributes: ['id', 'jobName', 'scheduleType']
				}
			]
		}).then(task => {
			//  if task permission matches current user's role
			if (req.token.roleId === 1) {
				//  delete task from Tasks table
				const deletedTask = Task.destroy(
					{
						where: {
							id: task.id
						}
					}
				).then((deleted) => {
					const { id } = deleted;
					res.json({ id }).status(204).end();
				});
			} else {
				//  Return a response with a 403 Client forbidden HTTP status code.
				res.status(403).json({ message: 'Access not permitted' });
			}
		})
	};

	return {
		getTasks,
		getTask,
		postTask,
		putTask,
		deleteTasks,
		deleteTask
	};
};

module.exports = TaskController;

