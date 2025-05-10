import React from 'react';
import { useDnD } from './DragDrop';
import { Typography, List, ListItem, Paper } from '@mui/material';

const nodeTypes = [
    { type: 'start', label: 'Start Node' },
    { type: 'stop', label: 'Stop Node' },
    { type: 'script', label: 'Script Node' },
    { type: 'report', label: 'Rapport Node' }
];

const DragDropSidebar: React.FC = () => {
    const [, setType] = useDnD();

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
        if (setType) setType(nodeType);
    };

    return (
        <Paper sx={{ p: 2, width: 180, height: '100%', overflowY: 'auto' }} elevation={2}>
            <Typography variant="subtitle1" gutterBottom>
                Sleepbare nodes
            </Typography>
            <List>
                {nodeTypes.map((node) => (
                    <ListItem
                        key={node.type + node.label}
                        draggable
                        onDragStart={(e) => onDragStart(e, node.type)}
                        sx={{
                            p: 1,
                            my: 1,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 1,
                            cursor: 'grab',
                            '&:hover': {
                                backgroundColor: '#e0e0e0'
                            }
                        }}
                    >
                        {node.label}
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default DragDropSidebar;