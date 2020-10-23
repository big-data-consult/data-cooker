import * as React from "react";
import { useMediaQuery } from '@material-ui/core';
import { Filter, ReferenceInput, SelectInput, TextInput, SimpleList, List, Datagrid, TextField, NumberField, ReferenceField, EditButton } from 'react-admin';

const SourceFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="Target Data" source="targetId" reference="targets" alwaysOn >
            <SelectInput optionText="targetData" />
        </ReferenceInput>
        {/* <TextInput label="Source Data" source="sourceData" allowEmpty /> */}
    </Filter>
);

export const SourceList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} filters={<SourceFilter />} title="List of aggregation sources">
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.sourceLabel}
                    secondaryText={record => `${record.sourceData} sourceData`}
                    tertiaryText={record => `${record.targetId} targetId`}
                />
            ) : (
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
            )}
        </List>
    );
}
