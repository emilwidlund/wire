import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Connection as _Connection, InputPort, OutputPort } from 'wire-core';
import { Node, Connection } from 'wire-ui';

import { EditorContext } from '../../EditorContext';
import { useMousePosition, useCanvasZoom } from '../../hooks';

interface ConnectionsProps {
    context: EditorContext;
}

export const Canvas = observer(({ context }: ConnectionsProps) => {
    const [mouseDownPort, setMouseDownPort] = React.useState<OutputPort<any>>(null);
    const {
        wireContext: { nodes, connections },
        mousePosition
    } = context;

    const { mouseMoveHandler } = useMousePosition(context);
    // const { ref, translateX, translateY, scale } = useCanvasZoom(0.1);

    return (
        <div
            id="canvas"
            onMouseUp={() => {
                setMouseDownPort(null);
            }}
        >
            <div id="nodes" onMouseMove={mouseMoveHandler}>
                {Array.from(nodes.values()).map(node => (
                    <Node
                        key={node.id}
                        node={node}
                        selected={context.selectedNode === node}
                        onMouseDown={() => {
                            context.selectedNode = node;
                        }}
                        onClickOutside={() => {
                            if (context.selectedNode === node) {
                                context.selectedNode = null;
                            }
                        }}
                        onPortMouseDown={(e, port) => {
                            if (port instanceof OutputPort) {
                                setMouseDownPort(port);
                            }
                        }}
                        onPortMouseUp={(e, port) => {
                            if (mouseDownPort && port instanceof InputPort) {
                                mouseDownPort.connect(port);
                            }
                        }}
                    />
                ))}
            </div>

            <svg id="connections" width="100%" height="100%" onMouseMove={mouseMoveHandler}>
                {Array.from(connections.values()).map((c: _Connection) => {
                    return <Connection key={c.id} connection={c} onClick={() => c.destroy()} />;
                })}

                {mouseDownPort ? <Connection fromPort={mouseDownPort} toPosition={mousePosition} /> : null}
            </svg>
        </div>
    );
});
