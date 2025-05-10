import {Box, Divider, IconButton, Stack, Typography} from '@mui/material';
import {Handle, type NodeProps, Position} from '@xyflow/react';
import type {AppNode} from '../../types/BaseNodeTypes';
import SettingsIcon from '@mui/icons-material/Settings';

export default function BaseNode({data}: NodeProps<AppNode>) {
    if (!data) return null;

    const Icon = data.icon;

    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 2,
                p: 2,
                width: 260,
                backgroundColor: 'white',
                position: 'relative',
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    {Icon && <Icon fontSize="small"/>}
                    <Typography variant="subtitle1" fontWeight="bold">
                        {data.title}
                    </Typography>
                </Stack>
                {data.onConfigure && (
                    <IconButton size="small" onClick={data.onConfigure}>
                        <SettingsIcon fontSize="small"/>
                    </IconButton>
                )}
            </Stack>

            <Divider sx={{mb: 1}}/>

            <Stack spacing={0.5}>
                {data.fields.map((field, i) => (
                    <Box key={i} display="flex" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                            {field.label}:
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                            {field.value}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            <Handle type="target" position={Position.Left} style={{top: '50%'}}/>
            <Handle type="source" position={Position.Right} style={{top: '50%'}}/>
        </Box>
    );
}