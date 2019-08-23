import { observable } from 'mobx';
import { Context as WireContext, Node } from 'wire-core';
import { WebGLRenderer, Scene, PerspectiveCamera, Mesh, BoxGeometry, MeshNormalMaterial } from 'three';

interface Position {
    x: number;
    y: number;
}

export interface EditorContextProps {
    wireContext: WireContext;
}

export class EditorContext {
    @observable wireContext: WireContext;
    @observable mousePosition: Position = { x: 0, y: 0 };
    @observable selectedNode: Node = null;

    @observable renderer: WebGLRenderer;
    @observable scene: Scene;
    @observable camera: PerspectiveCamera;

    constructor(props: EditorContextProps) {
        this.wireContext = props.wireContext;
    }

    setupTHREE(rendererRef: React.RefObject<HTMLDivElement>) {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(rendererRef.current.clientWidth, rendererRef.current.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            35,
            rendererRef.current.clientWidth / rendererRef.current.clientHeight,
            0.1,
            10000
        );

        this.camera.position.z = 10;

        rendererRef.current.appendChild(this.renderer.domElement);

        const update = () => {
            requestAnimationFrame(update);

            this.renderer.render(this.scene, this.camera);
        };

        requestAnimationFrame(update);
    }
}
