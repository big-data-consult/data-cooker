import * as React from "react";
import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput} from 'react-admin';

export const TaskEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput label="Task ID" source="id" />
            <ReferenceInput source="jobId" reference="jobs"><SelectInput optionText="jobName" /></ReferenceInput>
            <NumberInput source="taskNo" />
            <TextInput source="taskName" />
            <TextInput source="taskDescription" />
            <TextInput source="taskWorker" />
            {/* <TextInput source="taskStatus" /> */}
            <TextInput source="nextTaskOnSuccess" />
            <TextInput source="nextTaskOnFailure" />
            {/* <TextInput source="lastScheduledTime" /> */}
            {/* <TextInput source="lastCompleteTime" /> */}
            {/* <ReferenceInput source="permissionId" reference="permissions"><SelectInput optionText="id" /></ReferenceInput> */}
            {/* <NumberInput source="job.id" /> */}
        </SimpleForm>
    </Edit>
);
