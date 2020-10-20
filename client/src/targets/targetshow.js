import * as React from "react";
import { Show, SimpleShowLayout, TextField, ReferenceField, NumberField } from 'react-admin';

export const TargetShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="targetLabel" />
            <TextField source="targetData" />
            <TextField source="batchControlColumn" />
            <NumberField source="batchControlSize" />
            <TextField source="batchControlNext" />
            <TextField source="batchProcessed" />
            <TextField source="batchProcessing" />
            <TextField source="batchMicroChunkCurrent" />
            <TextField source="batchScheduleType" />
            <TextField source="batchScheduleLast" />
            <TextField source="patternColumns" />
            <TextField source="groupByColumns" />
            <NumberField source="groupByPattern" />
            <NumberField source="groupByFlexible" />
            <TextField source="aggregateColumns" />
            <TextField source="aggregateFunctions" />
            <TextField source="suppoetSpVersions" />
            <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField>
        </SimpleShowLayout>
    </Show>
);
