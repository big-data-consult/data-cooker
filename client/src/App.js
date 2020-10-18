import * as React from "react";
import { fetchUtils, Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import Dashboard from './providers/Dashboard';
import authProvider from './providers/authProvider';
import jsonServerProvider from './providers/dataProvider';
import { TargetList } from './targets/targets';
import { TargetEdit } from './targets/target';
import { SourceList } from './sources/sources';
import { UserList } from './users/users';
import MyLayout from './layout/MyLayout';

const httpClient = (url, options = {}) => {

  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  // pre-install a login user for dev
  // const token_0 = { "name": "joe@smith.com", "pass": "joepassword"};
  // localStorage.setItem('token', JSON.stringify(token_0));

  // Add authentication token
  const { token } = JSON.parse(localStorage.getItem('token'));
  options.headers.set('Authorization', `Bearer ${token}`);
  //options.headers.set('Authorization', `Basic ${token}`);

  // Add additional headers as needed
  options.headers.set('X-Custom-Header', 'foobar');
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider('http://localhost:5000/api', httpClient);

// const dataProvider = jsonServerProvider('http://localhost:5000/api');

//  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
const App = () => (
  <Admin layout={MyLayout} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} >
    {roleId => [
      <Resource name="targets" list={TargetList} edit={roleId ? TargetEdit : null} />,
      <Resource name="sources" list={SourceList} />,
      <Resource name="users" list={UserList} />,
      <Resource name="permissions" />
    ]}
  </Admin>
);

export default App;
