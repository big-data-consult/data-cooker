import * as React from "react";
import { Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, DateInput } from 'react-admin';

export const JobCreate = props => (
    <Create {...props}>
		<SimpleForm>
			{/* <NumberInput source="id" /> */}
			<TextInput source="jobName" />
			<TextInput source="jobDescription" />
			{/* <TextInput source="jobStatus" /> */}
			<NumberInput source="jobEnabled" />
			<NumberInput source="repeatSchedule" />
			<TextInput source="scheduleType" />
			<TextInput source="scheduleCron" />
			<DateInput source="scheduleBegin" />
			<DateInput source="scheduleEnd" />
			{/* <DateInput source="nextSchedule" /> */}
			{/* <DateInput source="lastSchedule" /> */}
			{/* <ReferenceInput source="permissionId" reference="permissions"><SelectInput optionText="id" /></ReferenceInput> */}
		</SimpleForm>
    </Create>
);
