import * as React from 'react';

export const useCanvasZoom = (factor: number) => {
    const ref = React.useRef<any>();
    const [translateX, setTranslateX] = React.useState<number>(0);
    const [translateY, setTranslateY] = React.useState<number>(0);
    const [scale, setScale] = React.useState<number>(1);

    let zoom = 1;
    let x = 0;
    let y = 0;

    React.useEffect(() => {
        ref.current.addEventListener('wheel', scrollZoomHandler);

        return () => {
            ref.current.removeEventListener('wheel', scrollZoomHandler);
        };
    }, []);

    const scrollZoomHandler = React.useCallback((e: WheelEvent) => {
        if (!e.altKey) return;
        e.preventDefault();

        const previousZoom = zoom;

        zoom += factor * (e.deltaY / 120);

        console.log(e.offsetX / previousZoom, e.offsetX / zoom);

        x += e.offsetX / previousZoom - e.offsetX / zoom;
        y += e.offsetY / previousZoom - e.offsetY / zoom;

        setScale(zoom);
        setTranslateX(x);
        setTranslateY(y);
    }, []);

    return { ref, translateX, translateY, scale };
};
