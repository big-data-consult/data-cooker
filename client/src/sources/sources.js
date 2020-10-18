import * as React from "react";
import { List, Datagrid, TextField, NumberField, ReferenceField, EditButton } from 'react-admin';

export const SourceList = props => (
    <List {...props}>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="sourceLabel" />
            <TextField source="sourceData" />
            {/* <NumberField source="sourceEnabled" />
            <TextField source="sourceReadyTime" />
            <TextField source="sourceCheckTime" />
            <TextField source="sourceCheckQuery" />
            <NumberField source="patternDefault" />
            <NumberField source="patternFlexible" />
            <TextField source="transformation" />
            <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField>
            <ReferenceField source="target.targetId" reference="target.targets"><TextField source="id" /></ReferenceField> */}
            <ReferenceField source="targetId" reference="targets"><TextField source="targetData" /></ReferenceField>
			<EditButton />
        </Datagrid>
    </List>
);
