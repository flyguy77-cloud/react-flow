import React from 'react';
import {useDnD} from '../context/DragDropContext.tsx';
import {Divider, List, ListItem, Paper, Typography} from '@mui/material';
import {nodeCategories} from "../../../shared/config/NodeCategories.ts";

const nodeTypes = [
    {type: 'start', label: 'Start'},
    {type: 'stop', label: 'Stop'},
    {type: 'loadScript', label: 'Load Script'},
    {type: 'inlineScript', label: 'Inline Script'},
    {type: 'runScript', label: 'Run Script'},
    {type: 'genereer', label: 'Genereer'}
];

const DragDropSidebar: React.FC = () => {
    const [, setType] = useDnD();

    const onDragStart = (event: React.DragEvent<HTMLLIElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
        if (setType) setType(nodeType);
    };

    return (
        <Paper sx={{p: 2, width: 240, height: '100%', overflowY: 'auto'}} elevation={2}>
            {nodeCategories.map((category, catIdx) => (
                <div key={category.label}>
                    <Typography variant="subtitle1" sx={{mb: 1}}>
                        {category.label}
                    </Typography>
                    <List disablePadding>
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
                    {catIdx < nodeCategories.length - 1 && <Divider sx={{my: 2}}/>}
                </div>
            ))}
        </Paper>
    );
};

export default DragDropSidebar;