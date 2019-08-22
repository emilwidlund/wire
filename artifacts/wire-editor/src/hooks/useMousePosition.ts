import * as React from 'react';

export const useMousePosition = (ref: React.RefObject<HTMLDivElement>) => {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const mouseMoveHandler = React.useCallback((e: MouseEvent) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    }, []);

    React.useEffect(() => {
        ref.current.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            ref.current.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);

    return mousePosition;
};
