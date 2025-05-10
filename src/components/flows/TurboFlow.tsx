import React, {useCallback, useRef} from 'react';
import {
    addEdge,
    Controls,
    Edge,
    Node,
    NodeTypes,
    OnConnect,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow
} from '@xyflow/react';

import '@xyflow/react/dist/base.css';
import {Box, Paper} from '@mui/material';

import BaseNode from '../nodes/BaseNode';
import {useDnD} from '../interaction/draganddrop/DragDrop';
import DragDropSidebar from '../interaction/draganddrop/DragDropSidebar';
import type {BaseNodeData} from '../../types/BaseNodeTypes';
import CustomEdge from '../edges/CustomEdge.tsx';
import {createNodeFromType} from "../../types/createNodeFromType.ts";
import {nodeRegistry} from "../../types/NodeRegistry.ts";
import StartNode from "../nodes/StartNode.tsx";
import EndNode from "../nodes/StopNode.tsx";

const nodeTypes: NodeTypes = {
    baseNode: BaseNode,
    script: BaseNode,
    report: BaseNode,
    start: StartNode,
    stop: EndNode
};

const edgeTypes = {
    custom: CustomEdge
};

const initialNodes: Node<BaseNodeData>[] = [
    {
        id: 'start-1',
        type: 'start',
        position: {x: 100, y: 150},
        data: {
            ...nodeRegistry.start,
            nodeType: '',
            title: '',
            fields: []
        }
    }
];

const initialEdges: Edge<{ label?: string }>[] = [
    {
        id: 'e-start-script',
        source: 'start-1',
        target: 'script-1',
        type: 'custom',
        data: {label: 'Volgende stap'},
        animated: true
    }
];

const defaultEdgeOptions = {
    type: 'custom',
    markerEnd: 'edge-circle'
};

const Flow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const {screenToFlowPosition} = useReactFlow();
    const [type] = useDnD();

    const onConnect: OnConnect = useCallback(
        (params) => setEdges((els) => addEdge(params, els)),
        []
    );

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY
            });

            const newNode = createNodeFromType(type, position);
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type, setNodes]
    );

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <Box sx={{height: '75vh', width: '100%', position: 'relative'}} ref={reactFlowWrapper}>
            <Paper elevation={1} sx={{height: '100%'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView={false} // Inzoomen bij drop uitzetten
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    defaultEdgeOptions={defaultEdgeOptions}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    style={{backgroundColor: '#fff'}}
                >
                    <Controls showInteractive={false}/>
                    <svg>
                        <defs>
                            <marker
                                id="edge-circle"
                                viewBox="-5 -5 10 10"
                                refX="0"
                                refY="0"
                                markerUnits="strokeWidth"
                                markerWidth="10"
                                markerHeight="10"
                                orient="auto"
                            >
                                <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0"/>
                            </marker>
                        </defs>
                    </svg>
                </ReactFlow>
            </Paper>

            <Box sx={{position: 'absolute', right: 0, top: 0, height: '100%'}}>
                <DragDropSidebar/>
            </Box>
        </Box>
    );
};

export default Flow;