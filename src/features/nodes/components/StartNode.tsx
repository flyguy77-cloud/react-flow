import {Box} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Handle, Position} from '@xyflow/react';
import {AppNodeProps} from "../types/BaseNodeTypes.ts";

const StartNode = ({data}: AppNodeProps) => {
    const isConnectedToEnd = data?.isConnectedToEnd;

    return (
        <Box
            sx={{
                width: 120,
                height: 60,
                borderRadius: 2,
                border: '2px solid #4caf50',
                backgroundColor: '#fff',
                color: isConnectedToEnd ? '#4caf50' : '#DADBDD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                position: 'relative',
                textAlign: 'center',
            }}
        >
            <PlayArrowIcon sx={{mr: 1}}/>
            Start
            <Handle
                type="source"
                position={Position.Right}
                style={{
                    background: isConnectedToEnd ? '#4caf50' : '#9e9e9e',
                    width: 10,
                    height: 10,
                    right: -6,
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            />
        </Box>
    );
};

export default StartNode;