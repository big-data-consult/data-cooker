import * as React from "react";
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const AvatarShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" /> 
            <TextField source="avatarData" />
        </SimpleShowLayout>
    </Show>
);
