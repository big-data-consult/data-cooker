import * as React from "react";
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const DepartmentShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" /> 
            <TextField source="department" />
        </SimpleShowLayout>
    </Show>
);
