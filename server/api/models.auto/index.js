const { Sequelize, DataTypes } = require("sequelize");

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/_config.json')[env];


let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const models = {
	Source: require("./aggModels/agg_Sources")(sequelize, DataTypes),
	Target: require("./aggModels/agg_Targets")(sequelize, DataTypes),
	Permission: require("./coreModels/core_Permissions")(sequelize, DataTypes),
	Plugin: require("./coreModels/core_Plugins")(sequelize, DataTypes),
	Course: require("./mediaModels/media_Courses")(sequelize, DataTypes),
	Note: require("./mediaModels/media_Notes")(sequelize, DataTypes),
	Job: require("./taskModels/task_Jobs")(sequelize, DataTypes),
	Task: require("./taskModels/task_Tasks")(sequelize, DataTypes),
	Avatar: require("./userModels/user_Avatars")(sequelize, DataTypes),
	Department: require("./userModels/user_Departments")(sequelize, DataTypes),
	Role: require("./userModels/user_Roles")(sequelize, DataTypes),
	User: require("./userModels/user_Users")(sequelize, DataTypes),
};

// models.Course.belongsTo(models.User, { as: 'user' });
// models.Note.belongsTo(models.User, { as: 'user' });
models.Permission.belongsTo(models.Role, { as: 'role' });
models.Source.belongsTo(models.Target, { as: 'target' });
models.Task.belongsTo(models.Job, { as: 'job' });
models.User.belongsTo(models.Avatar, { as: 'avatar' });
models.User.belongsTo(models.Role, { as: 'role' });
models.User.belongsTo(models.Department, { as: 'department' });

// models.Permission.belongsTo(models.Plugin, { as: 'plugin' });
models.Plugin.hasMany(models.Permission, { as: 'permissions' });
// models.Role.belongsTo(models.Plugin, { as: 'plugin' });
// models.Avatar.belongsTo(models.Plugin, { as: 'plugin' });
// models.Department.belongsTo(models.Plugin, { as: 'plugin' });
// models.User.belongsTo(models.Plugin, { as: 'plugin' });
models.Job.belongsTo(models.Plugin, { as: 'plugin' });
models.Task.belongsTo(models.Plugin, { as: 'plugin' });
models.Source.belongsTo(models.Plugin, { as: 'plugin' });
models.Target.belongsTo(models.Plugin, { as: 'plugin' });
models.Note.belongsTo(models.Plugin, { as: 'plugin' });
models.Course.belongsTo(models.Plugin, { as: 'plugin' });

// models.Avatar.hasMany(models.User, { as: 'users', foreignKey: 'avatarId' });
// models.Role.hasMany(models.User, { as: 'users', foreignKey: 'roleId' });
// models.Target.hasMany(models.Source, { as: 'sources', foreignKey: 'targetId' });
// models.User.hasMany(models.Note, { as: 'notes', foreignKey: 'creatorId' });
// models.User.hasMany(models.Course, { as: 'courses', foreignKey: 'creatorId' });


const db = {
	...models,
	sequelize
};

module.exports = db;
