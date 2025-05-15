import {Box, Typography} from '@mui/material';
import {Handle, Position} from '@xyflow/react';
import {AppNodeProps} from "../types/BaseNodeTypes.ts";

const LogicNode = ({data}: AppNodeProps) => {
    const {background = '#E3F2FD', text = '#1565C0'} = data.theme ?? {};
    const Icon = data.icon;

    return (
        <Box
            sx={{
                width: 80,
                height: 80,
                borderRadius: '50%', // ← cirkelvorm
                backgroundColor: background,
                border: `2px solid ${text}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                color: text
            }}
        >
            {Icon ? <Icon fontSize="small"/> : null}
            <Typography>
                {data.title}
            </Typography>
            <Handle type="target" position={Position.Left} style={{}}/>
            <Handle type="source" position={Position.Right} style={{}}/>
        </Box>
    );
};

export default LogicNode;