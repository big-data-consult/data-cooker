import * as React from "react";
import { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { fetchUtils, Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import Dashboard from './layout/Dashboard';
import MyLayout from './layout/MyLayout';
import authProvider from './providers/authProvider';
import jsonServerProvider from './providers/dataProvider';
import i18nProvider from './providers/i18nProvider';
import { DepartmentList } from './departments/departmentlist';
import { DepartmentShow } from './departments/departmentshow';
import { RoleList } from './roles/rolelist';
import { RoleShow } from './roles/roleshow';
import { UserList } from './users/userlist';
import { UserShow } from './users/usershow';
import { UserEdit } from './users/useredit';
import { UserCreate } from './users/usercreate';
import { AvatarList } from './avatars/avatarlist';
import { AvatarShow } from './avatars/avatarshow';
import { JobList } from './jobs/joblist';
import { JobShow } from './jobs/jobshow';
import { JobEdit } from './jobs/jobedit';
import { JobCreate } from './jobs/jobcreate';
import { TaskList } from './tasks/tasklist';
import { TaskShow } from './tasks/taskshow';
import { TaskEdit } from './tasks/taskedit';
import { TaskCreate } from './tasks/taskcreate';
import { TargetList } from './targets/targetlist';
import { TargetShow } from './targets/targetshow';
import { TargetEdit } from './targets/targetedit';
import { TargetCreate } from './targets/targetcreate';
import { SourceList } from './sources/sourcelist';
import { SourceShow } from './sources/sourceshow';
import { SourceEdit } from './sources/sourceedit';
import { SourceCreate } from './sources/sourcecreate';
// import { Base64 } from 'js-base64';

const httpClient = (url, options = {}) => {
	if (!options.headers) {
		options.headers = new Headers({ Accept: 'application/json' });
	}

	// Add authentication token
	const token = localStorage.getItem('token');
	options.headers.set('Authorization', 'Bearer ' + token);
	// // Add user roleId for permission check
	// const user = localStorage.getItem('user');
	// // const user = JSON.parse(localStorage.getItem('user'));
	// options.headers.set('user', JSON.stringify({ id: user.id, roleId: user.roleId }));

	// Add additional headers as needed
	options.headers.set('X-Custom-Header', 'foobar');
	return fetchUtils.fetchJson(url, options);
};

// // const dataProvider = jsonServerProvider('http://localhost:5000/respapi');
const dataProvider = jsonServerProvider('http://localhost:5000/respful', httpClient);
const loginProvider = jsonServerProvider('http://localhost:5000/userapi/login', httpClient);
const schemaProvider = jsonServerProvider('http://localhost:5000/graphql', httpClient);

class App extends Component {
	constructor() {
		super();
		this.state = { dataProvider: dataProvider, schemaProvider: null };
	}

	// componentDidMount() {
	// 	buildGraphQLProvider({ clientOptions: { uri: 'http://localhost:5000/graphql' } })
	// 		.then(dataProvider => this.setState({ dataProvider }));
	// }

	// componentDidMount() {
	// 	buildGraphQLProvider({ client: schemaProvider })
	// 		.then(dataProvider => this.setState({ dataProvider }));
	// }

	render() {
		const { dataProvider, schemaProvider } = this.state;

		// //authProvider.checkAuth()
		// const authUser = localStorage.getItem('token');
		// if (authUser && schemaProvider) {
		// 	buildGraphQLProvider({ client: schemaProvider })
		// 		.then(dataProvider => {
		// 			this.setState({ dataProvider });
		// 			//dataProvider = this.state
		// 		})
		// 		.catch(error => console.log(error))
		// }

		if (!dataProvider) {
			return <div>Loading</div>;
		}

		return (
			<Admin
				title={"Data Cooker Admin"}
				layout={MyLayout}
				dashboard={Dashboard}
				authProvider={authProvider}
				dataProvider={dataProvider}
				i18nProvider={i18nProvider}
			>
				{permissions => [
					// <Resource name="landscape" options={{ label: 'Data Landscape' }} list={TargetList} edit={roleId ? TargetEdit : null} />,
					// <Resource name="targets" options={{ label: 'Aggregation Targets' }} list={TargetList} edit={roleId ? TargetEdit : null} />,
					<Resource name="targets" options={{ label: 'Aggregation Targets' }} list={TargetList} edit={TargetEdit} create={TargetCreate} show={TargetShow} />,
					<Resource name="sources" options={{ label: 'Aggregation Sources' }} list={SourceList} edit={SourceEdit} create={SourceCreate} show={SourceShow} />,
					<Resource name="jobs" options={{ label: 'Scheduled Jobs' }} list={JobList} edit={JobEdit} create={JobCreate} show={ShowGuesser} />,
					<Resource name="tasks" options={{ label: 'Job Tasks' }} list={TaskList} edit={TaskEdit} create={TaskCreate} show={ShowGuesser} />,
					<Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} show={UserShow} />,
					<Resource name="avatars" list={AvatarList} show={AvatarShow} />,
					<Resource name="roles" list={RoleList} show={RoleShow} />,
					<Resource name="departments" list={DepartmentList} show={DepartmentShow} />,
					<Resource name="permissions" />
				]}
			</Admin>
		);
	}
}

export default App;
