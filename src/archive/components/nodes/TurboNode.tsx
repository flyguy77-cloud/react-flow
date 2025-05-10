import React, {memo, type ReactNode} from 'react';
import {FiCloud} from 'react-icons/fi';

import {Handle, type Node, type NodeProps, Position} from '@xyflow/react';

export type TurboNodeData = {
    title: string;
    icon?: ReactNode;
    subline?: string;
};

const TurboNode: React.FC<NodeProps<Node<TurboNodeData>>> = (({data}: NodeProps<Node<TurboNodeData>>) => {
    return (
        <div className="relative">
            <div
                className="cloud gradient absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full shadow-node overflow-hidden">
                <div className="flex items-center justify-center w-full h-full bg-bg-color rounded-full">
                    <FiCloud className="text-text-color"/>
                </div>
            </div>

            <div className="wrapper gradient flex flex-col p-2 relative border-2 rounded-md shadow-node">
                <div className="inner bg-bg-color p-4 rounded-md flex flex-col justify-center">
                    {/* Node body */}
                    <div className="body flex items-center">
                        {data.icon && (
                            <div className="icon mr-2 text-lg text-text-color">
                                {data.icon}
                            </div>
                        )}
                        <div>
                            <div className="title text-lg font-medium text-text-color">
                                {data.title}
                            </div>
                            {data.subline && (
                                <div className="subline text-sm text-gray-500">
                                    {data.subline}
                                </div>
                            )}
                        </div>
                    </div>
                    <Handle
                        type="target"
                        position={Position.Left}
                        className="opacity-0 hover:opacity-100"
                    />
                    <Handle
                        type="source"
                        position={Position.Right}
                        className="opacity-0 hover:opacity-100"
                    />
                </div>
            </div>
        </div>
    );
});

export default memo(TurboNode)