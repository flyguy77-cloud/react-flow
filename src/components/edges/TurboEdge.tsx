import {type EdgeProps, getBezierPath} from '@xyflow/react';

export default function CustomEdge({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       style = {},
                                       markerEnd,
                                   }: EdgeProps) {
    const xEqual = sourceX === targetX;
    const yEqual = sourceY === targetY;

    const [edgePath] = getBezierPath({
        // we need this little hack in order to display the gradient for a straight line
        sourceX: xEqual ? sourceX + 0.0001 : sourceX,
        sourceY: yEqual ? sourceY + 0.0001 : sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path className="stroke-[2] stroke-opacity-75 stroke-[url(#edge-gradient)]"
                  id={id}
                  style={style}
                  d={edgePath}
                  markerEnd={markerEnd}
            />
        </>
    );
}