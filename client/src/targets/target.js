import * as React from "react";
import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput} from 'react-admin';

export const TargetEdit = ({ permissions, ...props }) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="targetLabel" />
            <TextInput source="targetData" />
            <TextInput source="batchControlColumn" />
            <NumberInput source="batchControlSize" />
            <NumberInput source="batchControlNext" />
            <NumberInput source="batchProcessed" />
            <NumberInput source="batchProcessing" />
            <NumberInput source="batchMicroChunkCurrent" />
            <NumberInput source="batchScheduleType" />
            <NumberInput source="batchScheduleLast" />
            <NumberInput source="patternColumns" />
            <NumberInput source="groupByColumns" />
            <NumberInput source="groupByPattern" />
            <NumberInput source="groupByFlexible" />
            <NumberInput source="aggregateColumns" />
            <NumberInput source="aggregateFunctions" />
            <NumberInput source="suppoetSpVersions" />
            <ReferenceInput source="permissionId" reference="permissions"><SelectInput optionText="id" /></ReferenceInput>
        </SimpleForm>
    </Edit>
);
