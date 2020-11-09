/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CorePermissions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    permisionNote: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_Roles',
        key: 'id'
      }
    },
    pluginId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'core_Plugins',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'core_Permissions',
    timestamps: true
  });
};
