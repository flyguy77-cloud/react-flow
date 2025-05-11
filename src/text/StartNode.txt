import {Box} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Handle, NodeProps, Position} from '@xyflow/react';

const StartNode = (_props: NodeProps) => {
    return (
        <Box
            sx={{
                width: 120,
                height: 60,
                borderRadius: 2,
                border: '2px solid #4caf50',
                backgroundColor: '#fff',
                color: '#4caf50',
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
                    background: '#4caf50',
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