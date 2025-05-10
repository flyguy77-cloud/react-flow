import { Node } from '@xyflow/react';
import type { BaseNodeData } from './BaseNodeTypes.ts';
import { nodeRegistry } from './NodeRegistry.ts';

let counter = 100;
export const getNodeId = () => `node_${counter++}`;

export function createNodeFromType(type: string, position: { x: number, y: number }): Node<BaseNodeData> {
    const registryData = nodeRegistry[type];

    if (!registryData) {
        return {
            id: getNodeId(),
            type: 'baseNode',
            position,
            data: {
                nodeType: 'unknown',
                title: 'Unknown Node',
                fields: []
            }
        };
    }

    return {
        id: getNodeId(),
        type: type,
        position,
        data: {
            ...registryData,
            onConfigure: () => alert(`Configure ${registryData.type}`),
        } as BaseNodeData
    };
}