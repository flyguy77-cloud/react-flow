import React, {useCallback, useRef} from 'react';
import {
    addEdge, applyEdgeChanges, applyNodeChanges,
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

import BaseNode from '../../nodes/components/BaseNode.tsx';
import {useDnD} from '../../sidebar/context/DragDropContext.tsx';
import DragDropSidebar from '../../sidebar/components/DragDropSidebar.tsx';
import type {BaseNodeData} from '../../nodes/types/BaseNodeTypes.ts';
import CustomEdge from './CustomEdge.tsx';
import {createNodeFromType} from "../../nodes/factory/createNodeFromType.ts";
import {nodeRegistry} from "../../nodes/registry/NodeRegistry.ts";
import StartNode from "../../nodes/components/StartNode.tsx";
import EndNode from "../../nodes/components/StopNode.tsx";

const nodeTypes: NodeTypes = {
    baseNode: BaseNode,
    start: StartNode,
    stop: EndNode,
    loadScript: BaseNode,
    runScript: BaseNode,
    inlineScript: BaseNode,
    genereer: BaseNode
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
        } as BaseNodeData
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
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges] = useEdgesState(initialEdges);
    const {screenToFlowPosition} = useReactFlow();
    const [type] = useDnD();

    const onConnect: OnConnect = useCallback(
        (params) => {
            const updatedEdges = addEdge(params, edges);
            setEdges(updatedEdges);
            updateStartNodeStatus(nodes, updatedEdges); // <== add this to trigger a change on the canvas
        },
        [edges, nodes]
    );

    const updateStartNodeStatus = (nodes: Node[], edges: Edge[]) => {
        const updatedNodes = nodes.map((node) => {
            if (node.type !== 'start') return node;

            const isConnected = edges.some((edge) => {
                return edge.source === node.id && nodes.find(n => n.id === edge.target && n.type === 'stop');
            });

            return {
                ...node,
                data: {
                    ...node.data,
                    isConnectedToEnd: isConnected,
                }
            };
        });

        setNodes(updatedNodes);
    };

    const handleEdgesChange = useCallback((changes: any) => {
        const nextEdges = applyEdgeChanges(changes, edges);
        setEdges(nextEdges);
        updateStartNodeStatus(nodes, nextEdges);
    }, [edges, nodes]);

    const handleNodesChange = useCallback((changes: any) => {
        const nextNodes = applyNodeChanges(changes, nodes);
        setNodes(nextNodes);
        updateStartNodeStatus(nextNodes, edges); // gebruik up-to-date nodes
    }, [nodes, edges]);

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
                    onNodesChange={handleNodesChange}
                    onEdgesChange={handleEdgesChange}
                    onConnect={onConnect}
                    fitView={false} // turn off zoom in after dropping first node
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