/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');

/**
 * server configuration
 */
const config = require('../config/');
const auth = require('./policies/auth.policy');
const dbService = require('./services/db.service');
const { schema } = require('./graphql');

// environment: development, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const DB = dbService(environment, config.migrate).start();
const api = express();
const server = http.Server(api);
const mappedRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
// const DB = dbService(environment, config.migrate).start();

// private routes
const avatarRouter = require('./respful/avatar');
const roleRouter = require('./respful/role');
const userRouter = require('./respful/user');
const courseRouter = require('./respful/course');
const targetRouter = require('./respful/target');
const sourceRouter = require('./respful/source');
const permissionRouter = require('./respful/permission.js');
// const loginRouter = require('./respful/login');
// const defaultRouter = require('./respful/index');

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
api.use(helmet({
	dnsPrefetchControl: false,
	frameguard: false,
	ieNoOpen: false,
}));

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// public auth REST API
api.use('/userapi', mappedRoutes);

// private REST API
api.use('/respful/avatars', avatarRouter);
api.use('/respful/roles', roleRouter);
api.use('/respful/users', userRouter);
api.use('/respful/courses', courseRouter);
api.use('/respful/targets', targetRouter);
api.use('/respful/sources', sourceRouter);
api.use('/respful/permissions', permissionRouter);
// api.use('/respful', defaultRouter);
// api.use('/respful/login', loginRouter);


// private GraphQL API
api.post('/graphql', (req, res, next) => auth(req, res, next));

const graphQLServer = new ApolloServer({
	schema,
});

graphQLServer.applyMiddleware({
	app: api,
	cors: {
		origin: true,
		credentials: true,
		methods: ['POST'],
		allowedHeaders: [
			'X-Requested-With',
			'X-HTTP-Method-Override',
			'Content-Type',
			'Accept',
			'Authorization',
			'Access-Control-Allow-Origin',
		],
	},
	playground: {
		// endpoint: '/graphql',
		settings: {
			'editor.theme': 'light',
		},
	},
});

server.listen(config.port, () => {
	if (environment !== 'production'
		&& environment !== 'development'
		&& environment !== 'testing'
	) {
		console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
		process.exit(1);
	}
	return DB;
});
