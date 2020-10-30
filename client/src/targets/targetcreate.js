import * as React from "react";
import { Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput} from 'react-admin';

export const TargetCreate = props => (
    <Create {...props}>
        <SimpleForm>
            {/* <TextInput source="id" /> */}
            <TextInput source="targetLabel" />
            <TextInput source="targetData" />
            <TextInput source="batchControlColumn" />
            <NumberInput source="batchControlSize" />
            <TextInput source="batchControlNext" />
            <TextInput source="batchProcessed" />
            <TextInput source="batchProcessing" />
            <TextInput source="batchMicroChunkCurrent" />
            <TextInput source="batchScheduleType" />
            <TextInput source="batchScheduleLast" />
            <TextInput source="patternColumns" />
            <TextInput source="groupByColumns" />
            <NumberInput source="groupByPattern" />
            <NumberInput source="groupByFlexible" />
            <TextInput source="aggregateColumns" />
            <TextInput source="aggregateFunctions" />
            <TextInput source="suppoetSpVersions" />
            {/* <ReferenceInput source="permissionId" reference="permissions"><SelectInput optionText="id" /></ReferenceInput> */}
        </SimpleForm>
    </Create>
);
