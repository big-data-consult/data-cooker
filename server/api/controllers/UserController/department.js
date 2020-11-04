const { Department } = require('../../models');


const DepartmentController = () => {
	const getDepartments = async (req, res) => {
		const departments = await Department.findAll({
			attributes: ['id', 'department'],
		});
		res.header('Access-Control-Expose-Headers', 'X-Total-Count')
			.header('X-Total-Count', departments.length)
			.json({ departments });
	};


	const getDepartment = async (req, res) => {
		const department = await Department.findByPk(req.params.id, {
			attributes: ['id', 'department'],
		});

		if (department) {
			res.json({ department });
		} else {
			res.status(404).json({ message: 'Department id not found.' });
		}
	};

	const postDepartment = async (req, res, next) => {
		if (!req.body.department && !req.body.description) {
			const err = new Error('Please enter a department and a description.');
			err.status = 400;
			next(err);
		} else if (!req.body.department) {
			const err = new Error('Please enter a department.');
			err.status = 400;
			next(err);
		} else if (!req.body.description) {
			const err = new Error('Please enter a description.');
			err.status = 400;
			next(err);
		} else {
			Department.findOne({
				where: {
					department: req.body.department
				}
			}).then((department) => {
				if (department) {
					const err = new Error('This department already exists.');
					err.status = 400;
					next(err);
				} else {
					Department.create(req.body).then(department => {
						res.location(`/respful/departments/${department.id}`);
						res.status(201).end();
					})
						// Catch errors
						.catch((err) => {
							err.status = 400;
							next(err);
						});
				}
			})
		}
	};


	const putDepartment = async (req, res, next) => {
		const user = req.currentUser;
		// If department is left null
		if (!req.body.department && !req.body.description) {
			const err = new Error('Please enter a department and a description.');
			err.status = 400;
			next(err);
		} else if (!req.body.department) {
			const err = new Error('Please enter a department.');
			err.status = 400;
			next(err);
		} else if (!req.body.description) {
			const err = new Error('Please enter a description.');
			err.status = 400;
			next(err);
		} else {
			Department.findOne({
				where: {
					id: req.body.id
				}
			}).then((department) => {
				if (!department) {
					res.status(404).json({
						message: 'Department Not Found'
					});
				} else if (department) {
					if (user.id === department.userId) {
						const updateDepartment = {
							id: req.body.id,
							department: req.body.department,
							userId: req.currentUser.id,
						};
						department.update(req.body);
					} else {
						res.location('/').status(403).json('You do not have permissions to update this department');
					}
				}
			}).then(() => {
				res.status(204).end();
			})
				// Catch any errors
				.catch((err) => {
					err.status = 400;
					next(err);
				});
		}
	};

	const deleteDepartments = async (req, res, next) => {
		const filter = req.query.filter ? JSON.parse(req.query.filter) : {};

		// Only the user with admin role can do multi-deletion
		if (req.currentUser.roleId && req.currentUser.roleId !== 1) {
			res.status(403).json({ message: 'Only user with admin role can delete multiple rows!' });
		} else {
			// delete user from users table
			Department.destroy({
				where: filter,
			}).then((deleted) => {
				res.status(204).end(deleted);
			});
		}
	};

	const deleteDepartment = async (req, res, next) => {
		const user = req.currentUser;
		// Find one department to delete
		Department.findOne({
			where: {
				id: req.params.id
			}
		}).then((department) => {
			// If department doesn't exist
			if (!department) {
				// Show error
				res.status(404).json({
					message: 'Department Not Found'
				});
			} else if (user.id === department.userId) {
				// Delete the department
				return department.destroy();
			} else {
				res.location('/').status(403).json('You do not have permissions to delete this department');
			}
		}).then(() => {
			// Return no content and end the request
			res.status(204).end();
		})
			// Catch the errors
			.catch((err) => {
				err.status = 400;
				next(err);
			});
	};

	return {
		getDepartments,
		getDepartment,
		postDepartment,
		putDepartment,
		deleteDepartments,
		deleteDepartment,
	};
};

module.exports = DepartmentController;

