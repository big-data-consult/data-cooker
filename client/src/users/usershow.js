import * as React from "react";
import { Show, SimpleShowLayout, TextField, ReferenceField, NumberField } from 'react-admin';

export const UserShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" /> 
            <TextField source="firstName" />
            <TextField source="lastName" />
            <TextField source="emailAddress" />
            <ReferenceField source="roleId" reference="roles"><TextField source="id" /></ReferenceField>
            <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField>
            <NumberField source="role.id" />
        </SimpleShowLayout>
    </Show>
);
