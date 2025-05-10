import {BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath} from '@xyflow/react';

export default function CustomEdge({
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       style = {},
                                       markerEnd,
                                   }: EdgeProps) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style}/>
            <EdgeLabelRenderer>
                <div
                    className="button-edge__label nodrag nopan"
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                >
                </div>
            </EdgeLabelRenderer>
        </>
    );
}