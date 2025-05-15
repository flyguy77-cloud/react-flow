import type {Node, NodeProps} from '@xyflow/react';
import type {ComponentType} from "react";

export type BaseNodeType = 'number' | 'text' | 'loadScript' | 'inlineScript' | 'start' | 'end' | 'and';

export type NodeFieldType = 'text' | 'number' | 'select' | 'textarea';

export interface NodeActions {
    [actionName: string]: () => void;
}

export interface NodeField {
    key: string;
    label: string;
    value: string | number;
    type: NodeFieldType;
    options?: string[];
}

export interface NodeTheme {
    background: string;
    text: string;
    border?: string;
}

export interface BaseNodeData {
    nodeType: string;
    title: string;
    icon?: ComponentType<{ fontSize?: 'small' | 'medium' | 'large' }>;
    status: string;
    fields: NodeField[];
    actions?: NodeActions;
    theme?: NodeTheme;

    [key: string]: unknown;
}

export type AppNode = Node<BaseNodeData, BaseNodeType>;
export type AppNodeProps = NodeProps<AppNode>;