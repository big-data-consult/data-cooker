import * as React from "react";
import { List, Datagrid, TextField, NumberField, ReferenceField, EmailField, EditButton } from 'react-admin';

export const UserList = props => (
    <List {...props} title="List of the roles">
        <Datagrid>
            <NumberField source="id" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <EmailField source="emailAddress" />
            {/* <ReferenceField source="roleId" reference="roles"><TextField source="id" /></ReferenceField> */}
            {/* <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField> */}
			<EditButton />
        </Datagrid>
    </List>
);
