import * as React from 'react';

import { EditorContext } from '../EditorContext';

export const useMousePosition = (context: EditorContext) => {
    const mouseMoveHandler = (e: React.MouseEvent<HTMLDivElement | SVGElement, MouseEvent>) => {
        if ((e.nativeEvent.target as HTMLDivElement | SVGElement).id === 'connections') {
            context.mousePosition = {
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY
            };
        } else {
            context.mousePosition = {
                x: context.mousePosition.x + e.movementX,
                y: context.mousePosition.y + e.movementY
            };
        }
    };

    return { mouseMoveHandler };
};
