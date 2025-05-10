import { Box } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import { Handle, Position, NodeProps } from '@xyflow/react';

const EndNode = (_props: NodeProps) => {
    return (
        <Box
            sx={{
                width: 120,
                height: 60,
                borderRadius: 2,
                border: '2px solid #f44336',
                backgroundColor: '#fff',
                color: '#f44336',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                position: 'relative',
                textAlign: 'center',
            }}
        >
            <StopIcon sx={{ mr: 1 }} />
            Stop
            <Handle
                type="target"
                position={Position.Left}
                style={{
                    background: '#f44336',
                    width: 10,
                    height: 10,
                    left: -6,
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            />
        </Box>
    );
};

export default EndNode;