import * as React from 'react';
import { MultiplicationNode, SineNode, Context } from 'wire-core';
import { WebGLRenderer, Scene, PerspectiveCamera, Mesh, BoxGeometry, MeshNormalMaterial } from 'three';
import { Resizable } from 're-resizable';

import { Canvas } from '../Canvas';

import { TimerNode } from '../../nodes/TimerNode';
import { MeshNode } from '../../nodes/MeshNode';
import { Vector3Node } from '../../nodes/Vector3Node';

// const context = Context.import(localStorage.getItem('wire_context'));
const context = new Context();

export const App = () => {
    const rendererRef = React.useRef<HTMLDivElement>();

    let renderer: WebGLRenderer;
    let scene: Scene;
    let camera: PerspectiveCamera;
    let mesh: Mesh;

    const update = React.useCallback(() => {
        requestAnimationFrame(update);

        renderer.render(scene, camera);
    }, []);

    React.useEffect(() => {
        renderer = new WebGLRenderer({ antialias: true });
        renderer.setSize(rendererRef.current.clientWidth, rendererRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        scene = new Scene();
        camera = new PerspectiveCamera(
            35,
            rendererRef.current.clientWidth / rendererRef.current.clientHeight,
            0.1,
            10000
        );
        mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshNormalMaterial());

        scene.add(mesh);
        camera.position.z = 10;

        rendererRef.current.appendChild(renderer.domElement);

        new TimerNode(context);
        new MultiplicationNode(context, { inputPorts: { a: { defaultValue: 1 }, b: { defaultValue: 0.001 } } });
        new MeshNode(context, {}, mesh);
        new SineNode(context);

        setInterval(() => {
            localStorage.setItem('wire_context', context.serialize());
        }, 2000);

        requestAnimationFrame(update);
    }, []);

    return (
        <div id="app">
            <Canvas context={context} />
            <Resizable
                defaultSize={{ width: 800, height: '100%' }}
                onResize={(e, direction, target) => {
                    camera.aspect = target.clientWidth / target.clientHeight;
                    camera.updateProjectionMatrix();

                    renderer.setSize(target.clientWidth, target.clientHeight);
                }}
            >
                <div ref={rendererRef} style={{ width: '100%', height: '100%' }} />
            </Resizable>
        </div>
    );
};
