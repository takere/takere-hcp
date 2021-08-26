import React from 'react';

export const ConnectionLine = ({
                    sourceX,
                    sourceY,
                    sourcePosition,
                    targetX,
                    targetY,
                    targetPosition,
                    connectionLineType,
                    connectionLineStyle,
                }) => {
    return (
        <g>
            <path
                fill="none"
                stroke="#222"
                strokeWidth={1.5}
                className="animated"
                d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
            />
            <circle cx={targetX} cy={targetY} fill="#fff" r={6} stroke="#222" strokeWidth={2.5} />
        </g>
    );
};