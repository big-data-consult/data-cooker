import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, TextField } from 'react-admin';

export const AvatarList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} title="List of the avatars">
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.id}
                    secondaryText={record => `${record.avatarName} avatarData`}
                 />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="avatarData" />
                </Datagrid>

            )}
        </List>
    );
}
