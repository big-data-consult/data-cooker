import * as React from "react";
import { Show, SimpleShowLayout, TextField, ReferenceField, NumberField } from 'react-admin';

export const SourceShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="targetId" reference="targets"><TextField source="id" /></ReferenceField>
            <TextField source="sourceLabel" />
            <TextField source="sourceData" />
            <NumberField source="sourceEnabled" />
            <TextField source="sourceReadyTime" />
            <TextField source="sourceCheckTime" />
            <TextField source="sourceCheckQuery" />
            <NumberField source="patternDefault" />
            <NumberField source="patternFlexible" />
            <TextField source="transformation" />
            {/* <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField> */}
            <NumberField source="target.id" />
        </SimpleShowLayout>
    </Show>
);
