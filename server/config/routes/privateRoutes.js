const privateRoutes = {
	'GET /avatars': 'avatar.getAvatars',
	'GET /avatars/:id': 'avatar.getAvatar',

	'GET /courses': 'course.getCourses',
	'GET /courses/:id': 'course.getCourse',
	'POST /courses': 'course.postCourse',
	'PUT /courses/:id': 'course.postCourse',
	'DELETE /courses': 'course.deleteCourses',
	'DELETE /courses/:id': 'course.deleteCourse',

	'GET /jobs': 'job.getJobs',
	'GET /jobs/:id': 'job.getJob',
	'POST /jobs': 'job.postJob',
	'PUT /jobs/:id': 'job.postJob',
	'DELETE /jobs': 'job.deleteJobs',
	'DELETE /jobs/:id': 'job.deleteJob',

	'GET /notes': 'note.getNotes',
	'GET /notes/:id': 'note.getNote',
	'POST /notes': 'note.postNote',
	'PUT /notes/:id': 'note.postNote',
	'DELETE /notes': 'note.deleteNotes',
	'DELETE /notes/:id': 'note.deleteNote',

	'GET /permissions': 'permission.getPermissions',
	'GET /permissions/:id': 'permission.getPermission',

	'GET /roles': 'role.getRoles',
	'GET /roles/:id': 'role.getRole',

	'GET /sources': 'source.getSources',
	'GET /sources/:id': 'source.getSource',
	'POST /sources': 'source.postSource',
	'PUT /sources/:id': 'source.postSource',
	'DELETE /sources': 'source.deleteSources',
	'DELETE /sources/:id': 'source.deleteSource',

	'GET /targets': 'target.getTargets',
	'GET /targets/:id': 'target.getTarget',
	'POST /targets': 'target.postTarget',
	'PUT /targets/:id': 'target.postTarget',
	'DELETE /targets': 'target.deleteTargets',
	'DELETE /targets/:id': 'target.deleteTarget',

	'GET /tasks': 'task.getTasks',
	'GET /tasks/:id': 'task.getTask',
	'POST /tasks': 'task.postTask',
	'PUT /tasks/:id': 'task.postTask',
	'DELETE /tasks': 'task.deleteTasks',
	'DELETE /tasks/:id': 'task.deleteTask',

	'GET /users': 'user.getUsers',
	'GET /users/:id': 'user.getUser',
	'POST /users': 'user.postUser',
	'PUT /users/:id': 'user.postUser',
	'DELETE /users': 'user.deleteUsers',
	'DELETE /users/:id': 'user.deleteUser'
};

module.exports = privateRoutes;
