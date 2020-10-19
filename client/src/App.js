import * as React from "react";
import { fetchUtils, Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import Dashboard from './layout/Dashboard';
import MyLayout from './layout/MyLayout';
import authProvider from './providers/authProvider';
import jsonServerProvider from './providers/dataProvider';
import i18nProvider from './providers/i18nProvider';
import { TargetList } from './targets/targetlist';
import { TargetEdit } from './targets/targetedit';
import { TargetCreate } from './targets/targetcreate';
import { SourceList } from './sources/sourcelist';
import { SourceEdit } from './sources/sourceedit';
import { SourceCreate } from './sources/sourcecreate';
import { UserList } from './users/userlist';
import { UserEdit } from './users/useredit';
import { UserCreate } from './users/usercreate';
import { RoleList } from './roles/rolelist';
import { Base64 } from 'js-base64';

const httpClient = (url, options = {}) => {

  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  // Add authentication token
  const strToken = localStorage.getItem('token');
  const token = JSON.parse(strToken);
  options.headers.set('Authorization', 'Basic ' + Base64.btoa(token.emailAddress + ':' + token.password));

  // Add additional headers as needed
  options.headers.set('X-Custom-Header', 'foobar');
  return fetchUtils.fetchJson(url, options);
};

// const dataProvider = jsonServerProvider('http://localhost:5000/api');
const dataProvider = jsonServerProvider('http://localhost:5000/api', httpClient);

//  <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
const App = () => (
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
      <Resource name="targets" options={{ label: 'Aggregation Targets' }} list={TargetList} edit={TargetEdit} create={TargetCreate} />,
      <Resource name="sources" options={{ label: 'Aggregation Sources' }} list={SourceList} edit={SourceEdit} create={SourceCreate} />,
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />,
      <Resource name="Roles" list={RoleList} />,
      <Resource name="permissions" />
    ]}
  </Admin>
);

export default App;
