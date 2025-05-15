import {Box, Divider, IconButton, Menu, MenuItem, Select, Stack, TextField, Tooltip, Typography,} from '@mui/material';
import {Handle, type NodeProps, Position, useReactFlow,} from '@xyflow/react';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import RetryIcon from '@mui/icons-material/Replay';
import React, {useState} from 'react';
import type {AppNode, BaseNodeData} from '../types/BaseNodeTypes';

export default function BaseNode({id, data}: NodeProps<AppNode>) {
    const {setNodes} = useReactFlow(); // fetch Hook

    const Icon = data.icon;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleDelete = () => {
        if (window.confirm('Weet je zeker dat je deze node wilt verwijderen?')) {
            setNodes((prev) => prev.filter((node) => node.id !== id));
        }
    };

    const {background, text} = data.theme || {};

    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 2,
                p: 2,
                width: 260,
                backgroundColor: background || 'white',
                color: text || 'black',
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

                <Stack direction="row" spacing={0.5}>
                    <Tooltip title="Acties">
                        <IconButton size="small" onClick={handleClick}>
                            <SettingsIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Verwijder node">
                        <IconButton size="small" onClick={handleDelete}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Stack>

                {data.status === 'failed' && (
                    <Stack direction="row" spacing={0.5}>
                        <IconButton size="small" onClick={() => data.actions?.retry?.()}>
                            <RetryIcon fontSize="small"/>
                        </IconButton>
                    </Stack>
                )}


                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {Object.entries(data.actions ?? {}).map(([key, action]) => (
                        <MenuItem key={key} onClick={() => {
                            action();
                            handleClose();
                        }}>
                            {key}
                        </MenuItem>
                    ))}
                </Menu>
            </Stack>

            <Divider sx={{mb: 1}}/>

            <Stack spacing={1}>
                {data.fields.map((field) => {
                    const handleChange = (e: any) => {
                        const newValue = e.target.value;

                        // update node field value
                        setNodes((prev) =>
                            prev.map((node) => {
                                if (node.id !== id) return node;

                                const newFields = (node.data as BaseNodeData).fields.map((f) =>
                                    f.key === field.key ? {...f, value: newValue} : f
                                );

                                return {
                                    ...node,
                                    data: {
                                        ...node.data,
                                        fields: newFields
                                    }
                                };
                            })
                        );
                    };

                    if (field.type === 'select') {
                        return (
                            <Select
                                key={field.key}
                                label={field.label}
                                size="small"
                                fullWidth
                                value={field.value}
                                onChange={handleChange}
                            >
                                {field.options?.map((opt) => (
                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                ))}
                            </Select>
                        );
                    }

                    return (
                        <TextField
                            key={field.key}
                            label={field.label}
                            value={field.value}
                            size="small"
                            multiline
                            variant="filled"
                            fullWidth
                            type={field.type === 'number' ? 'number' : 'text'}
                            onChange={handleChange}
                        />
                    );
                })}
            </Stack>

            <Handle type="target" position={Position.Left} style={{top: '50%'}}/>
            <Handle type="source" position={Position.Right} style={{top: '50%'}}/>
        </Box>
    );
}