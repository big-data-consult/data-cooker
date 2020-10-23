'use strict';

// const Role = require("./role");
// const Course = require("./course");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required"
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {//this makes sure that the email address is formatted properly
          msg: "Please enter a valid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    permissionId: DataTypes.INTEGER
  }, {});

  User.associate = (models) => {
    //User" belongs to a single "Role"
    User.belongsTo(models.Role, {
      as: 'role',
      foreignKey: {
        fieldName: 'roleId',
      },
    });
 
  // //"User" has many "Courses"
  // User.hasMany(models.Course, {
  //   foreignKey: {
  //     fieldName: 'userId',
  //   },
  // });

  };

  return User;
};
