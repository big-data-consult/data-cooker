'use strict';

const bcryptService = require('../api/services/bcrypt.service');
const Context = require('./context');

class Database {

	constructor(seedData, enableLogging) {
		this.avatars = seedData.avatars;
		this.roles = seedData.roles;
		this.users = seedData.users;
		this.jobs = seedData.jobs;
		this.tasks = seedData.tasks;
		this.targets = seedData.targets;
		this.sources = seedData.sources;
		this.courses = seedData.courses;
		this.notes = seedData.notes;
		this.enableLogging = enableLogging;
		this.context = new Context('./db/database.sqlite', enableLogging);
		this.PasswordHasher = bcryptService();
	}

	log(message) {
		if (this.enableLogging) {
			console.info(message);
		}
	}

	tableExists(tableName) {
		this.log(`Checking if the ${tableName} table exists...`);

		return this.context.retrieveValue(`
			SELECT EXISTS (
				SELECT 1 
				FROM sqlite_master 
				WHERE type = 'table' AND name = ?
			);`,
			tableName
		);
	}

	createAvatar(avatar) {
		return this.context.execute(`
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
			avatar.avatarData
		);
	}

	createRole(role) {
		return this.context.execute(`
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
			role.roleName
		);
	}

	createUser(user) {
		return this.context.execute(`
			INSERT INTO Users(
				userName, 
				firstName, 
				lastName, 
				email, 
				password, 
				permissionId, 
				createdAt, 
				updatedAt,
				avatarId, 
				roleId 
			)
			VALUES(
				?, /* userName */
				?, /* firstName */
				?, /* lastName */
				?, /* email */
				?, /* password */
				?, /* permissionId */
				datetime('now'), 
				datetime('now'),
				?, /* avatarId */
				? /* roleId */
			);`,
			user.userName,
			user.firstName,
			user.lastName,
			user.email,
			user.password,
			user.permissionId,
			user.avatarId,
			user.roleId
		);
	}

	createJob(job) {
		return this.context.execute(`
			INSERT INTO Jobs(
				jobName,
				jobDescription,
				jobStatus,
				jobEnabled,
				repeatSchedule,
				scheduleType,
				scheduleCron,
				scheduleBegin,
				scheduleEnd,
				nextSchedule,
				lastSchedule,
				permissionId,
				createdAt,
				updatedAt
			)
			VALUES(
				?, /* jobName */
				?, /* jobDescription */
				'', /* jobStatus */
				1, /* jobEnabled */
				1, /* repeatSchedule */
				?, /* scheduleType */
				?, /* scheduleCron */
				'', /* scheduleBegin */
				'', /* scheduleEnd */
				'', /* nextSchedule */
				'', /* lastSchedule */
				2, /* permissionId */
				datetime('now'), 
				datetime('now')
			);`,
			job.jobName,
			job.jobDescription,
			job.scheduleType,
			job.scheduleCron
		);
	}

	createTask(task) {
		return this.context.execute(`
			INSERT INTO Tasks(
				taskNo,
				taskName,
				taskDescription,
				taskExecutor,
				taskStatus,
				nextTaskOnSuccess,
				nextTaskOnFailure,
				lastScheduledTime,
				lastCompleteTime,
				permissionId,
				createdAt, 
				updatedAt,
				jobId
			)
			VALUES(
				?, /* taskNo */
				?, /* taskName */
				'', /* taskDescription */
				'', /* taskExecutor */
				'', /* taskStatus */
				?, /* nextTaskOnSuccess */
				?, /* nextTaskOnFailure */
				'', /* lastScheduledTime */
				'', /* lastCompleteTime */
				2, /* permissionId */
				datetime('now'), 
				datetime('now'),
				? /* jobId */
			);`,
			task.taskNo,
			task.taskName,
			task.nextTaskOnSuccess,
			task.nextTaskOnFailure,
			task.jobId
		);
	}

	createTarget(target) {
		return this.context.execute(`
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
			target.permissionId
		);
	}

	createSource(source) {
		return this.context.execute(`
			INSERT INTO Sources(
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
				updatedAt,
				targetId
			)
			VALUES(
				?, /* sourceLabel */
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
				datetime('now'),
				? /* targetId */
			);`,
			source.sourceLabel,
			source.sourceData,
			source.transformation,
			source.permissionId,
			source.targetId
		);
	}

	createCourse(course) {
		return this.context.execute(`
			INSERT INTO Courses(
				title, 
				description, 
				estimatedTime, 
				materialsNeeded, 
				createdAt, 
				updatedAt,
				userId
			)
			VALUES(
				?, /* title */
				?, /* description */
				?, /* estimatedTime */
				?, /* materialsNeeded */
				datetime('now'), 
				datetime('now'),
				? /* userId */
			);`,
			course.title,
			course.description,
			course.estimatedTime,
			course.materialsNeeded,
			course.userId
		);
	}

	createNote(note) {
		return this.context.execute(`
			INSERT INTO Notes(
				note, 
				createdAt, 
				updatedAt,
				userId
			)
			VALUES(
				?, /* note */
				datetime('now'), 
				datetime('now'),
				? /* userId */
			);`,
			note.note,
			note.userId
		);
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

	async createJobs(jobs) {
		for (const job of jobs) {
			await this.createJob(job);
		}
	}

	async createTasks(tasks) {
		for (const task of tasks) {
			await this.createTask(task);
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

	async init(migrate) {

		// clear tables
		if (migrate) {
			await this.context.execute(`
				DELETE FROM Notes;
				DELETE FROM Courses;
				DELETE FROM Sources;
				DELETE FROM Targets;
				DELETE FROM Users;
				DELETE FROM Roles;
				DELETE FROM Avatars;
			`);
		}
		
		// load avatars
		const avatarTableExists = await this.tableExists('Avatars');
		if (!migrate && avatarTableExists) {
			this.log('Dropping the Avatars table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Avatars;
			`);
		}

		this.log('Creating the Avatars table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Avatars (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				avatarData VARCHAR(2048) NOT NULL DEFAULT '',
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the avatar records...');
		await this.createAvatars(this.avatars);


		// load roles
		const roleTableExists = await this.tableExists('Roles');
		if (!migrate && roleTableExists) {
			this.log('Dropping the Roles table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Roles;
			`);
		}

		this.log('Creating the Roles table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Roles (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				roleName VARCHAR(255) NOT NULL DEFAULT '',
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the role records...');
		await this.createRoles(this.roles);


		// load users
		const userTableExists = await this.tableExists('Users');
		if (!migrate && userTableExists) {
			this.log('Dropping the Users table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Users;
			`);
		}

		this.log('Creating the Users table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Users (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				userName VARCHAR(255) NOT NULL DEFAULT '', 
				firstName VARCHAR(255) NOT NULL DEFAULT '', 
				lastName VARCHAR(255) NOT NULL DEFAULT '', 
				email VARCHAR(255) NOT NULL DEFAULT '' UNIQUE, 
				password VARCHAR(255) NOT NULL DEFAULT '', 
				permissionId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL,
				avatarId INTEGER NULL REFERENCES Avatars (id),
				roleId INTEGER NULL REFERENCES Roles (id)
			);
			`);

		this.log('Hashing the user passwords...');
		await this.hashUserPasswords(this.users)
			.then(hasshedUsers => {
				this.log('Creating the user records...');
				this.createUsers(hasshedUsers);
			});


		// load jobs
		const jobTableExists = await this.tableExists('Jobs');
		if (!migrate && jobTableExists) {
			this.log('Dropping the Jobs table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Jobs;
			`);
		}

		this.log('Creating the Jobs table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Jobs (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				jobName STRING NOT NULL,
				jobDescription STRING,
				jobStatus STRING,
				jobEnabled INTEGER NOT NULL,
				repeatSchedule STRING NOT NULL,
				scheduleType STRING NOT NULL,
				scheduleCron STRING NOT NULL,
				scheduleBegin STRING,
				scheduleEnd STRING,
				nextSchedule STRING,
				lastSchedule STRING,
				permissionId INTEGER, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL
			);
			`);

		this.log('Creating the job records...');
		await this.createJobs(this.jobs);


		// load tasks
		const taskTableExists = await this.tableExists('Tasks');
		if (!migrate && taskTableExists) {
			this.log('Dropping the Tasks table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Tasks;
			`);
		}

		this.log('Creating the Tasks table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Tasks (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				taskNo INTEGER NOT NULL,
				taskName STRING NOT NULL,
				taskDescription STRING,
				taskExecutor STRING NOT NULL,
				taskStatus STRING,
				nextTaskOnSuccess NTEGER,
				nextTaskOnFailure INTEGER,
				lastScheduledTime STRING,
				lastCompleteTime STRING,
				permissionId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL,
				jobId INTEGER NOT NULL
					REFERENCES Jobs (id) ON DELETE CASCADE ON UPDATE CASCADE
			);
			`);

		this.log('Creating the task records...');
		await this.createTasks(this.tasks);

		// load targets
		const targetTableExists = await this.tableExists('Targets');
		if (!migrate && targetTableExists) {
			this.log('Dropping the Targets table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Targets;
			`);
		}

		this.log('Creating the Targets table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Targets (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				targetLabel STRING,
				targetData STRING NOT NULL,
				batchControlColumn STRING NOT NULL,
				batchControlSize INTEGER NOT NULL,
				batchControlNext STRING NOT NULL,
				batchProcessed INTEGER NOT NULL,
				batchProcessing INTEGER,
				batchMicroChunkCurrent INTEGER,
				batchScheduleType STRING,
				batchScheduleLast INTEGER,
				patternColumns BLOB NOT NULL,
				groupByColumns BLOB NOT NULL,
				groupByPattern INTEGER NOT NULL,
				groupByFlexible INTEGER NOT NULL,
				aggregateColumns BLOB NOT NULL,
				aggregateFunctions BLOB NOT NULL,
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
		if (!migrate && sourceTableExists) {
			this.log('Dropping the Sources table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Sources;
			`);
		}

		this.log('Creating the Sources table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Sources (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				sourceLabel STRING,
				sourceData STRING NOT NULL,
				sourceEnabled INTEGER,
				sourceReadyTime STRING NOT NULL,
				sourceCheckTime STRING,
				sourceCheckQuery STRING,
				patternDefault INTEGER NOT NULL,
				patternFlexible NTEGER NOT NULL,
				transformation STRING NOT NULL,
				permissionId INTEGER NOT NULL, 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL,
				targetId INTEGER NULL DEFAULT NULL
					REFERENCES Targets (id) ON DELETE CASCADE ON UPDATE CASCADE
			);
			`);

		this.log('Creating the source records...');
		await this.createSources(this.sources);

		// load courses
		const courseTableExists = await this.tableExists('Courses');
		if (!migrate && courseTableExists) {
			this.log('Dropping the Courses table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Courses;
			`);
		}

		this.log('Creating the Courses table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Courses (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				title VARCHAR(255) NOT NULL DEFAULT '', 
				description TEXT NOT NULL DEFAULT '', 
				estimatedTime VARCHAR(255), 
				materialsNeeded VARCHAR(255), 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL, 
				userId INTEGER NULL DEFAULT NULL 
					REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
			);
			`);

		this.log('Creating the course records...');
		await this.createCourses(this.courses);


		// load notes
		const noteTableExists = await this.tableExists('Notes');
		if (!migrate && noteTableExists) {
			this.log('Dropping the Notes table...');
			await this.context.execute(`
				DROP TABLE IF EXISTS Notes;
			`);
		}

		this.log('Creating the Notes table...');
		await this.context.execute(`
			CREATE TABLE IF NOT EXISTS Notes (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				note VARCHAR(255) NOT NULL DEFAULT '', 
				createdAt DATETIME NOT NULL, 
				updatedAt DATETIME NOT NULL, 
				userId INTEGER NULL DEFAULT NULL
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
