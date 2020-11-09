import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, TextField, EditButton } from 'react-admin';

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
                <Datagrid /* rowClick="edit" */>
                    <TextField source="id" />
                    <TextField source="department" />
					<EditButton />
                </Datagrid>

            )}
        </List>
    );
}
