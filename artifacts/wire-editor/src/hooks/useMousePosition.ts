import * as React from 'react';

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement | SVGElement, MouseEvent>) => {
        if ((e.nativeEvent.target as HTMLDivElement | SVGElement).id === 'connections') {
            setMousePosition({
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY
            });
        } else {
            setMousePosition({
                x: mousePosition.x + e.movementX,
                y: mousePosition.y + e.movementY
            });
        }
    };

    return { mouseMoveHandler, mousePosition };
};
