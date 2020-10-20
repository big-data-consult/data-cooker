import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, TextField, NumberField, ReferenceField, EmailField, EditButton } from 'react-admin';

export const UserList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} title="List of the users">
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.emailAddress}
                    secondaryText={record => `${record.firstName} firstName`}
                    tertiaryText={record => `${record.lastName} lastName`}
                />
            ) : (
                <Datagrid>
                    <NumberField source="id" />
                    <TextField source="firstName" />
                    <TextField source="lastName" />
                    <EmailField source="emailAddress" />
                    <ReferenceField source="roleId" reference="roles"><TextField source="roleName" /></ReferenceField>
                    {/* <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField> */}
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}