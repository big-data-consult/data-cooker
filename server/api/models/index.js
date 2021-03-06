const { Plugin } = require('./coreModels/core_Plugins');
const { Avatar } = require('./userModels/user_Avatars');
const { Role } = require('./userModels/user_Roles');
const { Department } = require('./userModels/user_Departments');
const { User } = require('./userModels/user_Users');
const { Job } = require('./taskModels/task_Jobs');
const { Task } = require('./taskModels/task_Tasks');
const { Source } = require('./aggModels/agg_Sources');
const { Target } = require('./aggModels/agg_Targets');
const { Note } = require('./mediaModels/media_Notes');
const { Course } = require('./mediaModels/media_Courses');
const { Permission } = require('./coreModels/core_Permissions');


// Course.belongsTo(User, { as: 'user' });
// Note.belongsTo(User, { as: 'user' });
Permission.belongsTo(Role, { as: 'role' });
Source.belongsTo(Target, { as: 'target' });
Task.belongsTo(Job, { as: 'job' });
User.belongsTo(Avatar, { as: 'avatar' });
User.belongsTo(Role, { as: 'role' });
User.belongsTo(Department, { as: 'department' });

// Permission.belongsTo(Plugin, { as: 'plugin' });
Plugin.hasMany(Permission, { as: 'permissions' });
// Role.belongsTo(Plugin, { as: 'plugin' });
// Avatar.belongsTo(Plugin, { as: 'plugin' });
// Department.belongsTo(Plugin, { as: 'plugin' });
// User.belongsTo(Plugin, { as: 'plugin' });
Job.belongsTo(Plugin, { as: 'plugin' });
Task.belongsTo(Plugin, { as: 'plugin' });
Source.belongsTo(Plugin, { as: 'plugin' });
Target.belongsTo(Plugin, { as: 'plugin' });
Note.belongsTo(Plugin, { as: 'plugin' });
Course.belongsTo(Plugin, { as: 'plugin' });

// Avatar.hasMany(User, { as: 'users', foreignKey: 'avatarId' });
// Role.hasMany(User, { as: 'users', foreignKey: 'roleId' });
// Target.hasMany(Source, { as: 'sources', foreignKey: 'targetId' });
// User.hasMany(Note, { as: 'notes', foreignKey: 'creatorId' });
// User.hasMany(Course, { as: 'courses', foreignKey: 'creatorId' });


module.exports = {
	Plugin,
	Avatar,
	Role,
	Department,
	User,
	Job,
	Task,
	Source,
	Target,
	Course,
	Note,
	Permission,
};

