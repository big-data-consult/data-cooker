const { Plugin } = require('./coreModels/Plugin');
const { Avatar } = require('./userModels/Avatar');
const { Role } = require('./userModels/Role');
const { Department } = require('./userModels/Department');
const { User } = require('./userModels/User');
const { Job } = require('./taskModels/Job');
const { Task } = require('./taskModels/Task');
const { Source } = require('./aggModels/Source');
const { Target } = require('./aggModels/Target');
const { Note } = require('./mediaModels/Note');
const { Course } = require('./mediaModels/Course');
const { Permission } = require('./coreModels/Permission');


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
}
;
