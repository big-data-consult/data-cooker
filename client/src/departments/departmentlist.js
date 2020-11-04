import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, TextField } from 'react-admin';

export const DepartmentList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} title="List of the departments">
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => `${record.department} department`}
                 />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField label="Department ID" source="id" />
                    <TextField source="department" />
                </Datagrid>

            )}
        </List>
    );
}
