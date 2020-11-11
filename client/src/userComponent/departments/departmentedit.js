import * as React from "react";
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const DepartmentEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="department" />
        </SimpleForm>
    </Edit>
);
