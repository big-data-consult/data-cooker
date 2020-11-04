const { Avatar } = require('./Avatar');
const { Course } = require('./Course');
const { Department } = require('./Department');
const { Job } = require('./Job');
const { Note } = require('./Note');
const { Permission } = require('./Permission');
const { Role } = require('./Role');
const { Source } = require('./Source');
const { Target } = require('./Target');
const { Task } = require('./Task');
const { User } = require('./User');


Course.belongsTo(User, { as: 'user' });
Note.belongsTo(User, { as: 'user' });
Permission.belongsTo(User, { as: 'permission' });
Source.belongsTo(Target, { as: 'target' });
Task.belongsTo(Job, { as: 'job' });
User.belongsTo(Avatar, { as: 'avatar' });
User.belongsTo(Role, { as: 'role' });
User.belongsTo(Department, { as: 'department' });

// Avatar.hasMany(User, { as: 'users', foreignKey: 'avatarId' });
// Role.hasMany(User, { as: 'users', foreignKey: 'roleId' });
// Target.hasMany(Source, { as: 'sources', foreignKey: 'targetId' });
// User.hasMany(Note, { as: 'notes', foreignKey: 'userId' });
// User.hasMany(Course, { as: 'courses', foreignKey: 'userId' });


module.exports = {
	Avatar,
	Course,
	Department,
	Job,
	Note,
	Permission,
	Role,
	Source,
	Target,
	Task,
	User,
};
