import * as React from "react";
import { Show, SimpleShowLayout, TextField, ReferenceField, NumberField } from 'react-admin';

export const UserShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" /> 
            <TextField source="userName" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="email" />
            <ReferenceField source="avatarId" reference="avatars"><NumberField source="id" /></ReferenceField>
            <ReferenceField source="roleId" reference="roles"><TextField source="roleName" /></ReferenceField>
            {/* <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField> */}
            {/* <NumberField source="role.id" /> */}
        </SimpleShowLayout>
    </Show>
);
