import * as React from "react";
import { Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput} from 'react-admin';

export const TaskCreate = props => (
    <Create {...props}>
        <SimpleForm>
            {/* <TextInput source="id" /> */}
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
    </Create>
);
