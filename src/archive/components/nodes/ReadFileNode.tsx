import React, {useCallback} from 'react';
import {Handle, Position} from '@xyflow/react';

const handleStyle = {left: 10};

interface ReadFileNodeProps {
    data: {
        onFileUpload?: (id: string, fileName: string, content: string | ArrayBuffer | null) => void;
        onFileRemove?: (id: string) => void;
    };
    isConnectable: boolean;
}

const ReadFileNode: React.FC<ReadFileNodeProps> = ({data, isConnectable}) => {
    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const file = evt.target.files?.[0];
        if (file && data?.onFileUpload) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result;
                if (data?.onFileUpload) {
                    data.onFileUpload('readFileNode', file.name, content || null);
                }
            };
            reader.readAsText(file);
        }
    }, [data]);

    return (
        <div className="text-updater-node">
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
            />
            <div>
                <label htmlFor="file"/>
                <input type="file" name="file" onChange={onChange} className="nodrag"/>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                isConnectable={isConnectable}
            />
        </div>
    );
}

export default ReadFileNode;