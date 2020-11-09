/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserUsers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_Departments',
        key: 'id'
      }
    },
    avatarId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_Avatars',
        key: 'id'
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user_Roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_Users',
    timestamps: true,
    indexes: [
      {
        name: "sqlite_autoindex_user_Users_1",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
