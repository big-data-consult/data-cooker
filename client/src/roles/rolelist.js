import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, TextField, NumberField, ReferenceField, EmailField, EditButton } from 'react-admin';

export const RoleList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} title="List of the roles">
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.roleName}
                    secondaryText={record => `${record.id} id`}
                 />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="roleName" />
                </Datagrid>

            )}
        </List>
    );
}
