import * as React from 'react';
import { MultiplicationNode, SineNode, Context as WireContext } from 'wire-core';
import { WebGLRenderer, Scene, PerspectiveCamera, Mesh, BoxGeometry, MeshNormalMaterial } from 'three';
import { Resizable } from 're-resizable';

import { EditorContext } from '../../EditorContext';
import { Canvas } from '../Canvas';

import { TimerNode } from '../../nodes/TimerNode';
import { MeshNode } from '../../nodes/MeshNode';
import { Vector3Node } from '../../nodes/Vector3Node';

// const wireContext = WireContext.import(localStorage.getItem('wire_context'));
const wireContext = new WireContext();

const context = new EditorContext({ wireContext });

export const App = () => {
    const rendererRef = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        context.setupTHREE(rendererRef);

        const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshNormalMaterial());
        context.scene.add(mesh);

        new TimerNode(wireContext);
        new MultiplicationNode(wireContext, { inputPorts: { a: { defaultValue: 1 }, b: { defaultValue: 0.001 } } });
        new MeshNode(wireContext, {}, mesh);
        new SineNode(wireContext);

        setInterval(() => {
            localStorage.setItem('wire_context', wireContext.serialize());
        }, 2000);
    }, []);

    return (
        <div id="app">
            <Canvas context={context} />
            <Resizable
                defaultSize={{ width: 800, height: '100%' }}
                onResize={(e, direction, target) => {
                    context.camera.aspect = target.clientWidth / target.clientHeight;
                    context.camera.updateProjectionMatrix();

                    context.renderer.setSize(target.clientWidth, target.clientHeight);
                }}
            >
                <div ref={rendererRef} style={{ width: '100%', height: '100%' }} />
            </Resizable>
        </div>
    );
};
