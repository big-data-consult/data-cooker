import * as React from "react";
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin';

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="userName" />
            <TextInput source="firstName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <ReferenceInput source="avatarId" reference="avatars"><SelectInput optionText="id" /></ReferenceInput>
            <ReferenceInput source="departmentId" reference="departments"><SelectInput optionText="department" /></ReferenceInput>
            <ReferenceInput source="roleId" reference="roles"><SelectInput optionText="roleName" /></ReferenceInput>
            {/* <NumberInput source="avatar.id" /> */}
            {/* <NumberInput source="role.id" /> */}
            {/* <NumberInput source="department.id" /> */}
        </SimpleForm>
    </Edit>
);