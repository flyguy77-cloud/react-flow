import React, {useCallback, useRef} from 'react';
import {
    addEdge,
    Background,
    Controls,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import Sidebar from '../interaction/draganddrop/DragDropSidebar.tsx';
import {DnDProvider, useDnD} from '../interaction/draganddrop/DragDrop.tsx';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: {label: 'input node'},
        position: {x: 250, y: 5},
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {screenToFlowPosition} = useReactFlow();
    const [type] = useDnD();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: {label: `${type} node`},
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{height: '75vh'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    // style={{backgroundColor: "darksalmon"}}
                >
                    <Controls/>
                    <Background/>
                </ReactFlow>
            </div>
            <Sidebar/>
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDProvider>
            <DnDFlow/>
        </DnDProvider>
    </ReactFlowProvider>
);