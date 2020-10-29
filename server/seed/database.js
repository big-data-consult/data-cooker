'use strict';

//const bcryptjs = require('bcryptjs');
const bcryptService = require('../../graphql/api/services/bcrypt.service');
const Context = require('./context');

class Database {

	constructor(seedData, enableLogging) {
		this.avatars = seedData.avatars;
		this.roles = seedData.roles;
		this.users = seedData.users;
		this.targets = seedData.targets;
		this.sources = seedData.sources;
		this.courses = seedData.courses;
		this.notes = seedData.notes;
		this.enableLogging = enableLogging;
		this.context = new Context('../graphql/db/database.sqlite', enableLogging);
		this.PasswordHasher = bcryptService();
	}

	log(message) {
		if (this.enableLogging) {
			console.info(message);
		}
	}

	tableExists(tableName) {
		this.log(`Checking if the ${tableName} table exists...`);

		return this.context
			.retrieveValue(`
				SELECT EXISTS (
				SELECT 1 
				FROM sqlite_master 
				WHERE type = 'table' AND name = ?
				);`,
				tableName);
	}

	createAvatar(avatar) {
		return this.context
			.execute(`
				INSERT INTO Avatars(
				id, 
				avatarData, 
				createdAt, 
				updatedAt
				)
				VALUES(
				?, /* id */
				?, /* avatarData */
				datetime('now'), 
				datetime('now')
				);`,
				avatar.id,
				avatar.avatarData);
	}

	createRole(role) {
		return this.context
			.execute(`
				INSERT INTO Roles(
				id, 
				roleName, 
				createdAt, 
				updatedAt
				)
				VALUES(
				?, /* id */
				?, /* roleName */
				datetime('now'), 
				datetime('now')
				);`,
				role.id,
				role.roleName);
	}

	createUser(user) {
		return this.context
			.execute(`
				INSERT INTO Users(
				userName, 
				firstName, 
				lastName, 
				email, 
				password, 
				avatarId, 
				roleId, 
				permissionId, 
				createdAt, 
				updatedAt
				)
				VALUES(
				?, /* userName */
				?, /* firstName */
				?, /* lastName */
				?, /* email */
				?, /* password */
				?, /* avatarId */
				?, /* roleId */
				?, /* permissionId */
				datetime('now'), 
				datetime('now')
				);`,
				user.userName,
				user.firstName,
				user.lastName,
				user.email,
				user.password,
				user.avatarId,
				user.roleId,
				user.permissionId
			);
	}

	createTarget(target) {
		return this.context
			.execute(`
				INSERT INTO Targets(
				targetLabel,
				targetData,
				batchControlColumn,
				batchControlSize,
				batchControlNext,
				batchProcessed,
				batchProcessing,
				batchMicroChunkCurrent,
				batchScheduleType,
				batchScheduleLast,
				patternColumns,
				groupByColumns,
				groupByPattern,
				groupByFlexible,
				aggregateColumns,
				aggregateFunctions,
				suppoetSpVersions,
				permissionId,
				createdAt,
				updatedAt
				)
				VALUES(
				?, /* targetLabel */
				?, /* targetData */
				?, /* batchControlColumn */
				5, /* batchControlSize */
				'', /* batchControlNext */
				'', /* batchProcessed */
				'', /* batchProcessing */
				'', /* batchMicroChunkCurrent */
				'', /* batchScheduleType */
				'', /* batchScheduleLast */
				'', /* patternColumns */
				'', /* groupByColumns */
				0, /* groupByPattern */
				0, /* groupByFlexible */
				'', /* aggregateColumns */
				'', /* aggregateFunctions */
				'', /* suppoetSpVersions */
				?, /* permissionId */
				datetime('now'), 
				datetime('now')
				);`,
				target.targetLabel,
				target.targetData,
				target.batchControlColumn,
				target.permissionId);
	}

	createSource(source) {
		return this.context
			.execute(`
				INSERT INTO Sources(
				targetId,
				sourceLabel,
				sourceData,
				sourceEnabled,
				sourceReadyTime,
				sourceCheckTime,
				sourceCheckQuery,
				patternDefault,
				patternFlexible,
				transformation,
				permissionId,
				createdAt, 
				updatedAt
				)
				VALUES(
				?, /* targetId */
				'', /* sourceLabel */
				?, /* sourceData */
				0, /* sourceEnabled */
				'', /* sourceReadyTime */
				'', /* sourceCheckTime */
				'', /* sourceCheckQuery */
				0, /* patternDefault */
				0, /* patternFlexible */
				?, /* transformation */
				?, /* permissionId */
				datetime('now'), 
				datetime('now')
				);`,
				source.targetId,
				source.sourceData,
				source.transformation,
				source.permissionId);
	}

	createCourse(course) {
		return this.context
			.execute(`
				INSERT INTO Courses(
				userId, 
				title, 
				description, 
				estimatedTime, 
				materialsNeeded, 
				createdAt, 
				updatedAt
				)
				VALUES(
				?, /* userId */
				?, /* title */
				?, /* description */
				?, /* estimatedTime */
				?, /* materialsNeeded */
				datetime('now'), 
				datetime('now')
				);`,
				course.userId,
				course.title,
				course.description,
				course.estimatedTime,
				course.materialsNeeded);
	}

	createNote(note) {
		return this.context
			.execute(`
				INSERT INTO Notes(
				userId, 
				note, 
				createdAt, 
				updatedAt
				)
				VALUES(
				?, /* userId */
				?, /* note */
				datetime('now'), 
				datetime('now')
				);`,
				note.userId,
				note.note,
				note.estimatedTime,
				note.materialsNeeded);
	}

	async hashUserPasswords(users) {
		const usersWithHashedPasswords = [];
		for (const user of users) {
			this.log('Original password: ' + user.password);
			const hashedPassword = this.PasswordHasher.password(user);
			this.log('Hasshed password: ' + hashedPassword);
			usersWithHashedPasswords.push({ ...user, password: hashedPassword });
		}
		return usersWithHashedPasswords;
	}

	async createAvatars(avatars) {
		for (const avatar of avatars) {
			await this.createAvatar(avatar);
		}
	}

	async createRoles(roles) {
		for (const role of roles) {
			await this.createRole(role);
		}
	}

	async createUsers(users) {
		for (const user of users) {
			await this.createUser(user);
		}
	}

	async createTargets(targets) {
		for (const target of targets) {
			await this.createTarget(target);
		}
	}

	async createSources(sources) {
		for (const source of sources) {
			await this.createSource(source);
		}
	}

	async createCourses(courses) {
		for (const course of courses) {
			await this.createCourse(course);
		}
	}

	async createNotes(notes) {
		for (const note of notes) {
			await this.createNote(note);
		}
	}

	async init() {

		// load avatars
		const avatarTableExists = await this.tableExists('Avatars');
		if (avatarTableExists) {
			this.log('Dropping the Avatars table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Avatars;
			`);
		}

		this.log('Creating the Avatars table...');
		await this.context.execute(`
			CREATE TABLE Avatars (
				id INTEGER PRIMARY KEY, 
				avatarData VARCHAR(2048) NOT NULL DEFAULT '',
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the avatar records...');
		await this.createAvatars(this.avatars);


		// load roles
		const roleTableExists = await this.tableExists('Roles');
		if (roleTableExists) {
			this.log('Dropping the Roles table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Roles;
			`);
		}

		this.log('Creating the Roles table...');
		await this.context.execute(`
			CREATE TABLE Roles (
				id INTEGER PRIMARY KEY, 
				roleName VARCHAR(255) NOT NULL DEFAULT '',
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the role records...');
		await this.createRoles(this.roles);


		// load users
		const userTableExists = await this.tableExists('Users');
		if (userTableExists) {
			this.log('Dropping the Users table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Users;
			`);
		}

		this.log('Creating the Users table...');
		await this.context.execute(`
			CREATE TABLE Users (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				userName VARCHAR(255) NOT NULL DEFAULT '', 
				firstName VARCHAR(255) NOT NULL DEFAULT '', 
				lastName VARCHAR(255) NOT NULL DEFAULT '', 
				email VARCHAR(255) NOT NULL DEFAULT '' UNIQUE, 
				password VARCHAR(255) NOT NULL DEFAULT '', 
				avatarId INTEGER NULL REFERENCES Avatars (id),
				roleId INTEGER NULL REFERENCES Roles (id),
				permissionId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Hashing the user passwords...');
		await this.hashUserPasswords(this.users)
			.then(hasshedUsers => {
				this.log('Creating the user records...');
				this.createUsers(hasshedUsers);
			});


		// load targets
		const targetTableExists = await this.tableExists('Targets');
		if (targetTableExists) {
			this.log('Dropping the Targets table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Targets;
			`);
		}

		this.log('Creating the Targets table...');
		await this.context.execute(`
			CREATE TABLE Targets (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				targetLabel STRING,
				targetData STRING,
				batchControlColumn STRING,
				batchControlSize INTEGER,
				batchControlNext STRING,
				batchProcessed INTEGER,
				batchProcessing INTEGER,
				batchMicroChunkCurrent INTEGER,
				batchScheduleType STRING,
				batchScheduleLast INTEGER,
				patternColumns BLOB,
				groupByColumns BLOB,
				groupByPattern INTEGER,
				groupByFlexible INTEGER,
				aggregateColumns BLOB,
				aggregateFunctions BLOB,
				suppoetSpVersions BLOB,
				permissionId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the target records...');
		await this.createTargets(this.targets);


		// load sources
		const sourceTableExists = await this.tableExists('Sources');
		if (sourceTableExists) {
			this.log('Dropping the Sources table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Sources;
			`);
		}

		this.log('Creating the Sources table...');
		await this.context.execute(`
			CREATE TABLE Sources (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				targetId INTEGER NOT NULL DEFAULT -1 
				REFERENCES Targets (id) ON DELETE CASCADE ON UPDATE CASCADE,
				sourceLabel STRING,
				sourceData STRING,
				sourceEnabled INTEGER,
				sourceReadyTime STRING,
				sourceCheckTime STRING,
				sourceCheckQuery STRING,
				patternDefault INTEGER,
				patternFlexible NTEGER,
				transformation STRING,
				permissionId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the source records...');
		await this.createSources(this.sources);

		// load courses
		const courseTableExists = await this.tableExists('Courses');
		if (courseTableExists) {
			this.log('Dropping the Courses table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Courses;
			`);
		}

		this.log('Creating the Courses table...');
		await this.context.execute(`
			CREATE TABLE Courses (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				title VARCHAR(255) NOT NULL DEFAULT '', 
				description TEXT NOT NULL DEFAULT '', 
				estimatedTime VARCHAR(255), 
				materialsNeeded VARCHAR(255), 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL, 
				userId INTEGER NOT NULL DEFAULT -1 
				REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
			);
			`);

		this.log('Creating the course records...');
		await this.createCourses(this.courses);


		// load notes
		const noteTableExists = await this.tableExists('Notes');
		if (noteTableExists) {
			this.log('Dropping the Notes table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Notes;
			`);
		}

		this.log('Creating the Notes table...');
		await this.context.execute(`
			CREATE TABLE Notes (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				note VARCHAR(255) NOT NULL DEFAULT '', 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL, 
				userId INTEGER NOT NULL DEFAULT -1 
				REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
			);
			`);

		this.log('Creating the Note records...');
		await this.createNotes(this.notes);


		// Done
		this.log('Database successfully initialized!');
	}
}

module.exports = Database;
