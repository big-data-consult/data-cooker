import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { SimpleList, List, Datagrid, TextField, NumberField, DateField, /*ReferenceField,*/ EditButton } from 'react-admin';

export const JobList = props => {
	const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
	return (
		<List {...props} title="List of the scheduled jobs">
			{isSmall ? (
				<SimpleList
					primaryText={record => record.jobName}
					secondaryText={record => `${record.jobStatus} jobStatus`}
					tertiaryText={record => `${record.jobEnabled} jobEnabled`}
				/>
			) : (
					<Datagrid /* rowClick={ (e) => { e.stopPropagation(); alert(1) } } */>
						<NumberField source="id" />
						<TextField source="jobName" />
						{/* <DateField source="jobDescription" /> */}
						<TextField source="scheduleCron" />
						<NumberField source="jobEnabled" />
						<TextField source="jobStatus" />
						{/* <NumberField source="repeatSchedule" /> */}
						{/* <TextField source="scheduleType" /> */}
						{/* <DateField source="scheduleBegin" /> */}
						{/* <DateField source="scheduleEnd" /> */}
						{/* <TextField source="nextSchedule" /> */}
						{/* <TextField source="lastSchedule" /> */}
						{/* <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField> */}
						<EditButton />
					</Datagrid>
				)}
		</List>
	);
}

