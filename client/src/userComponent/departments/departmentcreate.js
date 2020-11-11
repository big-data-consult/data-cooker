import * as React from "react";
import { Create, SimpleForm, TextInput } from 'react-admin';

export const DepartmentCreate = props => (
    <Create {...props}>
        <SimpleForm>
            {/* <TextInput source="id" /> */}
            <TextInput source="department" />
        </SimpleForm>
    </Create>
);
