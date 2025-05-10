import {Node} from '@xyflow/react';
import type {BaseNodeData} from '../types/BaseNodeTypes.ts';
import {nodeRegistry} from '../registry/NodeRegistry.ts';

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
                fields: [],
                actions: {
                    configure: () => alert('Unknown node type')
                }
            }
        };
    }

    return {
        id: getNodeId(),
        type: 'baseNode',
        position,
        data: {
            ...registryData,
            nodeType: type,
            // No extra `configure`, everything is present in `actions` via nodeRegistry
        } as BaseNodeData
    };
}