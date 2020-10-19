import * as React from "react";
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput} from 'react-admin';

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="emailAddress" />
            {/* <ReferenceInput source="roleId" reference="roles"><SelectInput optionText="id" /></ReferenceInput> */}
            {/* <ReferenceInput source="permissionId" reference="permissions"><SelectInput optionText="id" /></ReferenceInput> */}
        </SimpleForm>
    </Edit>
);
