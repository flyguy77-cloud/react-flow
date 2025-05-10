import type {Node, NodeProps} from '@xyflow/react';
import {ComponentType} from "react";

export type BaseNodeType = 'number' | 'text' | 'script' | 'start' | 'end';

export type NodeFieldType = 'text' | 'number' | 'select';

export interface NodeField {
    key: string;
    label: string;
    value: string | number;
    type: NodeFieldType;
    options?: string[];
}

export interface BaseNodeData {
    nodeType: string;
    title: string;
    icon?: ComponentType<{ fontSize?: 'small' | 'medium' | 'large' }>;
    fields: NodeField[];
    onConfigure?: () => void;
    [key: string]: unknown;
}

export type AppNode = Node<BaseNodeData, BaseNodeType>;
export type AppNodeProps = NodeProps<AppNode>;