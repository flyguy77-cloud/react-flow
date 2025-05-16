import {
    Box,
    Divider,
    IconButton,
    List,
    ListItemButton,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import {Handle, type NodeProps, Position, useReactFlow,} from '@xyflow/react';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import RetryIcon from '@mui/icons-material/Replay';
import React, {useState} from 'react';
import type {AppNode, BaseNodeData} from '../types/BaseNodeTypes';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function BaseNode({id, data}: NodeProps<AppNode>) {
    const {setNodes} = useReactFlow();
    const Icon = data.icon;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeSelect, setActiveSelect] = useState<string | null>(null);
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
    const frequency = data.fields.find((f) => f.key === 'frequency')?.value;

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
                    const isOpen = activeSelect === field.key;

                    // Conditional rendering based on visibleIf
                    if (field.visibleIf) {
                        const freq = frequency;
                        if (field.visibleIf.frequency) {
                            const expected = field.visibleIf.frequency;
                            const matches = Array.isArray(expected) ? expected.includes(freq) : freq === expected;
                            if (!matches) return null;
                        }
                        if (field.visibleIf.notFrequency) {
                            const excluded = field.visibleIf.notFrequency;
                            const blocked = Array.isArray(excluded) ? excluded.includes(freq) : freq === excluded;
                            if (blocked) return null;
                        }
                    }

                    const handleChange = (
                        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>
                    ) => {
                        const newValue = e.target.value;
                        setNodes((prev) =>
                            prev.map((node) => {
                                if (node.id !== id) return node;
                                const newFields = (node.data as BaseNodeData).fields.map((f) =>
                                    f.key === field.key ? {...f, value: newValue} : f
                                );
                                return {...node, data: {...node.data, fields: newFields}};
                            })
                        );
                    };

                    const renderLabel = (
                        <Typography variant="body2" fontWeight="medium"
                                    sx={{mb: 0.5, ml: 0.5, textAlign: 'left', color: 'text.secondary'}}>
                            {field.label}
                        </Typography>
                    );

                    if (field.type === 'datetime') {
                        return (
                            <Box key={field.key}>
                                {renderLabel}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        value={dayjs(field.value)}
                                        onChange={(newValue) => {
                                            const newIso = newValue?.toISOString();
                                            setNodes((prev) =>
                                                prev.map((node) => {
                                                    if (node.id !== id) return node;
                                                    const newFields = (node.data as BaseNodeData).fields.map((f) =>
                                                        f.key === field.key ? {...f, value: newIso} : f
                                                    );
                                                    return {...node, data: {...node.data, fields: newFields}};
                                                })
                                            );
                                        }}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                variant: 'filled',
                                                fullWidth: true
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                        );
                    }

                    if (field.type === 'select') {
                        return (
                            <Box key={field.key}>
                                {renderLabel}
                                <ListItemButton
                                    onClick={() => setActiveSelect(isOpen ? null : field.key)}
                                    sx={{
                                        px: 2,
                                        py: 1.25,
                                        backgroundColor: 'rgba(0,0,0,0.06)',
                                        border: '1px solid rgba(0,0,0,0.23)',
                                        borderRadius: 1,
                                        fontSize: '0.875rem',
                                        fontFamily: 'Roboto, sans-serif',
                                        '&:hover': {backgroundColor: 'rgba(0,0,0,0.08)'}
                                    }}
                                >
                                    {field.value}
                                </ListItemButton>
                                {isOpen && (
                                    <List disablePadding sx={{border: '1px solid #ccc', borderRadius: 1, mt: 1}}>
                                        {field.options?.map((opt) => (
                                            <ListItemButton
                                                key={opt}
                                                onClick={() => {
                                                    handleChange({target: {value: opt}} as any);
                                                    setActiveSelect(null);
                                                }}
                                            >
                                                {opt}
                                            </ListItemButton>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        );
                    }

                    return (
                        <Box key={field.key}>
                            {renderLabel}
                            <TextField
                                value={field.value}
                                size="small"
                                variant="filled"
                                fullWidth
                                multiline={field.type === 'textarea'}
                                type={field.type === 'number' ? 'number' : 'text'}
                                onChange={handleChange}
                            />
                        </Box>
                    );
                })}
            </Stack>
            <Handle type="target" position={Position.Left} style={{top: '50%'}}/>
            <Handle type="source" position={Position.Right} style={{top: '50%'}}/>
        </Box>
    );
}
