import * as React from "react";
import { Component } from 'react';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { fetchUtils, Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import Dashboard from './layout/Dashboard';
import MyLayout from './layout/MyLayout';
import authProvider from './providers/authProvider';
import jsonServerProvider from './providers/dataProvider';
import i18nProvider from './providers/i18nProvider';

import { DepartmentList } from './userComponent/departments/departmentlist';
import { DepartmentShow } from './userComponent/departments/departmentshow';
import { DepartmentEdit } from './userComponent/departments/departmentedit';
import { DepartmentCreate } from './userComponent/departments/departmentcreate';
import { RoleList } from './userComponent/roles/rolelist';
import { RoleShow } from './userComponent/roles/roleshow';
import { UserList } from './userComponent/users/userlist';
import { UserShow } from './userComponent/users/usershow';
import { UserEdit } from './userComponent/users/useredit';
import { UserCreate } from './userComponent/users/usercreate';
import { AvatarList } from './userComponent/avatars/avatarlist';
import { AvatarShow } from './userComponent/avatars/avatarshow';

import { JobList } from './taskComponent/jobs/joblist';
import { JobShow } from './taskComponent/jobs/jobshow';
import { JobEdit } from './taskComponent/jobs/jobedit';
import { JobCreate } from './taskComponent/jobs/jobcreate';
import { TaskList } from './taskComponent/tasks/tasklist';
import { TaskShow } from './taskComponent/tasks/taskshow';
import { TaskEdit } from './taskComponent/tasks/taskedit';
import { TaskCreate } from './taskComponent/tasks/taskcreate';

import { TargetList } from './aggComponent/targets/targetlist';
import { TargetShow } from './aggComponent/targets/targetshow';
import { TargetEdit } from './aggComponent/targets/targetedit';
import { TargetCreate } from './aggComponent/targets/targetcreate';
import { SourceList } from './aggComponent/sources/sourcelist';
import { SourceShow } from './aggComponent/sources/sourceshow';
import { SourceEdit } from './aggComponent/sources/sourceedit';
import { SourceCreate } from './aggComponent/sources/sourcecreate';
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
					<Resource name="avatars" list={AvatarList} show={AvatarShow} />,
					<Resource name="roles" list={RoleList} show={RoleShow} />,
					<Resource name="departments" list={DepartmentList} edit={DepartmentEdit} create={DepartmentCreate} show={DepartmentShow} />,
					<Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} show={UserShow} />,
					<Resource name="permissions" />
				]}
			</Admin>
		);
	}
}

export default App;
