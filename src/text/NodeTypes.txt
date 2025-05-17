// nodeTypes.ts
import BaseNode from '../../features/nodes/components/BaseNode';
import StartNode from '../../features/nodes/components/StartNode';
import EndNode from '../../features/nodes/components/StopNode';
import LogicNode from '../../features/nodes/components/LogicNode';

import {NodeTypes} from '@xyflow/react';
import {nodeRegistry} from '../../features/nodes/registry/NodeRegistry';
import ConditionNode from "../../features/nodes/components/ConditionalNode.tsx";

const componentMap: Record<string, any> = {
    start: StartNode,
    stop: EndNode,
    orJoin: LogicNode,
    andJoin: LogicNode,
    conditionNode: ConditionNode,
    // Aleen de uitzonderingen tov de BaseNode hier opnemen, anders wordt het standaard een BaseNode
};

export const getNodeComponent = (type: string) => {
    return componentMap[type] ?? BaseNode;
};

export const nodeTypes: NodeTypes = Object.fromEntries(
    Object.keys(nodeRegistry).map((type) => [type, getNodeComponent(type)])
);