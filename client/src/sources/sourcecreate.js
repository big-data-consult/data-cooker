import * as React from "react";
import { Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput} from 'react-admin';

export const SourceCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <ReferenceInput source="targetId" reference="targets"><SelectInput optionText="id" /></ReferenceInput>
            <TextInput source="sourceLabel" />
            <TextInput source="sourceData" />
            <NumberInput source="sourceEnabled" />
            <TextInput source="sourceReadyTime" />
            <TextInput source="sourceCheckTime" />
            <TextInput source="sourceCheckQuery" />
            <NumberInput source="patternDefault" />
            <NumberInput source="patternFlexible" />
            <TextInput source="transformation" />
            <ReferenceInput source="permissionId" reference="permissions"><SelectInput optionText="id" /></ReferenceInput>
            <TextInput source="target" />
        </SimpleForm>
    </Create>
);
