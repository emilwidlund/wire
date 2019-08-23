import { observable } from 'mobx';
import { Context as WireContext, Node } from 'wire-core';

interface Position {
    x: number;
    y: number;
}

export class EditorContext {
    @observable wireContext: WireContext;
    @observable mousePosition: Position = { x: 0, y: 0 };
    @observable selectedNode: Node = null;

    constructor(wireContext: WireContext) {
        this.wireContext = wireContext;
    }
}
