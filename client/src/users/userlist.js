import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { Filter, ReferenceInput, SelectInput, SimpleList, List, Datagrid, TextField, ImageField, ChipField, ReferenceField, EmailField, EditButton } from 'react-admin';

const UserFilter = (props) => (
	<Filter {...props}>
		<ReferenceInput label="Role Name" source="roleId" reference="roles" alwaysOn >
			<SelectInput optionText="roleName" />
		</ReferenceInput>
		{/* <TextInput label="User Name" source="email" allowEmpty /> */}
	</Filter>
);

export const UserList = props => {
	const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
	return (
		<List {...props} filters={<UserFilter />} title="List of the users">
			{isSmall ? (
				<SimpleList
					primaryText={record => record.email}
					secondaryText={record => `${record.firstName} firstName`}
					tertiaryText={record => `${record.lastName} lastName`}
				/>
			) : (
					<Datagrid>
						<TextField source="id" />
						<ReferenceField source="avatarId" reference="avatars"><ImageField source="avatarData" /></ReferenceField>
						<TextField source="userName" />
						<TextField source="firstName" />
						<TextField source="lastName" />
						<EmailField source="email" />
						<ReferenceField source="roleId" reference="roles"><ChipField source="roleName" /></ReferenceField>
						{/* <ReferenceField source="permissionId" reference="permissions"><TextField source="id" /></ReferenceField> */}
						<EditButton />
					</Datagrid>
				)}
		</List>
	);
}
