'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const models = require('./models').sequelize;
const cors = require('cors');
//const authenticate = require('./routes/auth');
const roleRouter = require('./routes/role');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const targetRouter = require('./routes/target');
const sourceRouter = require('./routes/source');
const permissionRouter = require('./routes/permission.js');
const loginRouter = require('./routes/login');
const defaultRouter = require('./routes/index');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// use cors for all routes
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Middleware that tells express incoming data should be read as json
// and also that it should be made available in the req.body
app.use(express.json());


// routes
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/targets', targetRouter);
app.use('/api/sources', sourceRouter);
app.use('/api/permissions', permissionRouter);
app.use('/api/login', loginRouter);
app.use('/api', defaultRouter);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the REST API project!',
	});
});

// send 404 if no other route matched
app.use((req, res) => {
	res.status(404).json({
		message: 'Route Not Found',
	});
});

// setup a global error handler
app.use((err, req, res, next) => {
	if (enableGlobalErrorLogging) {
		console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
	}

	res.status(err.status || 500).json({
		message: err.message,
		error: {},
	});
});


// set our port
app.set('port', process.env.PORT || 5000);

//Instantiate an instance of the Sequelize class and 
//configure the instance to use the fsjstd-restapi.db SQLite database that you generated when setting up the project.

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./fsjstd-restapi.db"
})

db.authenticate()
.then(() => {
  console.log('Connected to database.');
})
.catch(err => console.error('The connection failed.'));

// start listening on port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
