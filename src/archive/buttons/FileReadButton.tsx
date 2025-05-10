import React, {useState} from 'react';
import {Handle, Position} from '@xyflow/react';
import {FiTrash2, FiUpload} from 'react-icons/fi';

interface FileUploadNodeProps {
    id: string;
    data: {
        onFileUpload?: (id: string, fileName: string, content: string | ArrayBuffer | null) => void;
        onFileRemove?: (id: string) => void;
    };
    isConnectable: boolean;
}

const FileUploadNode: React.FC<FileUploadNodeProps> = ({id, data, isConnectable}) => {
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFileName(file.name);

            if (data?.onFileUpload) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const content = e.target?.result;
                    data.onFileUpload?.(id, file.name, content || null);
                };
                reader.readAsText(file);
            }
        }
    };

    const handleFileRemove = () => {
        setUploadedFileName(null);
        if (data?.onFileRemove) {
            data.onFileRemove(id);
        }
    };

    return (
        <div
            style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                textAlign: 'center',
                width: '200px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
            <div style={{cursor: 'pointer', marginBottom: '10px'}}>
                <FiUpload size={24} color="#007bff"
                          onClick={() => document.getElementById(`file-upload-${id}`)?.click()}/>
                <div style={{fontSize: '12px', color: '#555'}}>Upload File</div>
                <input
                    type="file"
                    id={`file-upload-${id}`}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />
            </div>
            {uploadedFileName ? (
                <div
                    style={{
                        marginTop: '10px',
                        fontSize: '10px',
                        color: '#333',
                        wordBreak: 'break-word',
                    }}
                >
                    <strong>File:</strong> {uploadedFileName}
                    <button
                        onClick={handleFileRemove}
                        style={{
                            marginLeft: '5px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#f00',
                            cursor: 'pointer',
                        }}
                        title="Remove file"
                    >
                        <FiTrash2 size={12}/>
                    </button>
                </div>
            ) : (
                <div style={{fontSize: '10px', color: '#999'}}>No file uploaded</div>
            )}
            <Handle
                type="source"
                position={Position.Bottom}
                style={{background: '#555'}}
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default FileUploadNode;