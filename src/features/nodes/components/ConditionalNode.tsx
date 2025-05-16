import React from 'react';
import {Box, Stack, TextField, Typography} from '@mui/material';
import {Handle, Position, useReactFlow} from '@xyflow/react';
import type {AppNodeProps} from '../types/BaseNodeTypes.ts';

const ConditionNode: React.FC<AppNodeProps> = ({id, data}) => {
    const {setNodes} = useReactFlow();
    const expressionField = data.fields.find((f) => f.key === 'expression');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setNodes((prev) =>
            prev.map((node) => {
                if (node.id !== id) return node;

                const newFields = data.fields.map((f) =>
                    f.key === 'expression' ? {...f, value: newValue} : f
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

    return (
        <Box
            sx={{
                width: 200,
                borderRadius: 2,
                p: 2,
                boxShadow: 2,
                backgroundColor: data.theme?.background || '#FFF8E1',
                color: data.theme?.text || '#F57C00',
                position: 'relative',
                textAlign: 'center'
            }}
        >
            <Typography variant="subtitle2" fontWeight="bold">
                IF / ELSE
            </Typography>

            <Stack spacing={1} mt={1}>
                <TextField
                    label="Voorwaarde"
                    size="small"
                    fullWidth
                    value={expressionField?.value ?? ''}
                    onChange={handleChange}
                    variant="filled"
                />
            </Stack>

            {/* Handles */}
            <Handle type="target" position={Position.Top} style={{top: -6}}/>

            <Handle
                type="source"
                position={Position.Bottom}
                id="true"
                style={{
                    bottom: -6,
                    left: '25%',
                    transform: 'translateX(-50%)',
                    background: '#4caf50'
                }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="false"
                style={{
                    bottom: -6,
                    left: '75%',
                    transform: 'translateX(-50%)',
                    background: '#f44336'
                }}
            />
        </Box>
    );
};

export default ConditionNode;