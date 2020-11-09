var DataTypes = require("sequelize").DataTypes;
var _AggSources = require("./agg_Sources");
var _AggTargets = require("./agg_Targets");
var _CorePermissions = require("./core_Permissions");
var _CorePlugins = require("./core_Plugins");
var _MediaCourses = require("./media_Courses");
var _MediaNotes = require("./media_Notes");
var _TaskJobs = require("./task_Jobs");
var _TaskTasks = require("./task_Tasks");
var _UserAvatars = require("./user_Avatars");
var _UserDepartments = require("./user_Departments");
var _UserRoles = require("./user_Roles");
var _UserUsers = require("./user_Users");

function initModels(sequelize) {
  var AggSources = _AggSources(sequelize, DataTypes);
  var AggTargets = _AggTargets(sequelize, DataTypes);
  var CorePermissions = _CorePermissions(sequelize, DataTypes);
  var CorePlugins = _CorePlugins(sequelize, DataTypes);
  var MediaCourses = _MediaCourses(sequelize, DataTypes);
  var MediaNotes = _MediaNotes(sequelize, DataTypes);
  var TaskJobs = _TaskJobs(sequelize, DataTypes);
  var TaskTasks = _TaskTasks(sequelize, DataTypes);
  var UserAvatars = _UserAvatars(sequelize, DataTypes);
  var UserDepartments = _UserDepartments(sequelize, DataTypes);
  var UserRoles = _UserRoles(sequelize, DataTypes);
  var UserUsers = _UserUsers(sequelize, DataTypes);

  AggSources.belongsTo(CorePlugins, { foreignKey: "pluginId"});
  CorePlugins.hasMany(AggSources, { foreignKey: "pluginId"});
  AggSources.belongsTo(AggTargets, { foreignKey: "targetId"});
  AggTargets.hasMany(AggSources, { foreignKey: "targetId"});
  AggTargets.belongsTo(CorePlugins, { foreignKey: "pluginId"});
  CorePlugins.hasMany(AggTargets, { foreignKey: "pluginId"});
  CorePermissions.belongsTo(CorePlugins, { foreignKey: "pluginId"});
  CorePlugins.hasMany(CorePermissions, { foreignKey: "pluginId"});
  CorePermissions.belongsTo(UserRoles, { foreignKey: "roleId"});
  UserRoles.hasMany(CorePermissions, { foreignKey: "roleId"});
  MediaCourses.belongsTo(CorePlugins, { foreignKey: "pluginId"});
  CorePlugins.hasMany(MediaCourses, { foreignKey: "pluginId"});
  MediaNotes.belongsTo(CorePlugins, { foreignKey: "pluginId"});
  CorePlugins.hasMany(MediaNotes, { foreignKey: "pluginId"});
  TaskJobs.belongsTo(CorePlugins, { foreignKey: "pluginId"});
  CorePlugins.hasMany(TaskJobs, { foreignKey: "pluginId"});
  TaskTasks.belongsTo(CorePlugins, { foreignKey: "pluginId"});
  CorePlugins.hasMany(TaskTasks, { foreignKey: "pluginId"});
  TaskTasks.belongsTo(TaskJobs, { foreignKey: "jobId"});
  TaskJobs.hasMany(TaskTasks, { foreignKey: "jobId"});
  UserUsers.belongsTo(UserRoles, { foreignKey: "roleId"});
  UserRoles.hasMany(UserUsers, { foreignKey: "roleId"});
  UserUsers.belongsTo(UserAvatars, { foreignKey: "avatarId"});
  UserAvatars.hasMany(UserUsers, { foreignKey: "avatarId"});
  UserUsers.belongsTo(UserDepartments, { foreignKey: "departmentId"});
  UserDepartments.hasMany(UserUsers, { foreignKey: "departmentId"});

  return {
    AggSources,
    AggTargets,
    CorePermissions,
    CorePlugins,
    MediaCourses,
    MediaNotes,
    TaskJobs,
    TaskTasks,
    UserAvatars,
    UserDepartments,
    UserRoles,
    UserUsers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
