import * as React from "react";
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const RoleShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" /> 
            <TextField source="roleName" />
        </SimpleShowLayout>
    </Show>
);
