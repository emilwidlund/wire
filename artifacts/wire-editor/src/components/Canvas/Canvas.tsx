import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Connection as _Connection, Context, InputPort, OutputPort } from 'wire-core';
import { Node, Connection } from 'wire-ui';

import { useMousePosition } from '../../hooks/useMousePosition';

interface ConnectionsProps {
    context: Context;
}

export const Canvas = observer(({ context }: ConnectionsProps) => {
    const [mouseDownPort, setMouseDownPort] = React.useState<OutputPort<any>>(null);

    const { mouseMoveHandler, mousePosition } = useMousePosition();

    return (
        <div
            id="canvas"
            onMouseUp={() => {
                setMouseDownPort(null);
            }}
        >
            <div id="nodes" onMouseMove={mouseMoveHandler}>
                {Array.from(context.nodes.values()).map(node => (
                    <Node
                        key={node.id}
                        node={node}
                        selected={false}
                        onClickOutside={() => console.log('outside')}
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
                {Array.from(context.connections.values()).map((c: _Connection) => {
                    return <Connection key={c.id} connection={c} onClick={() => c.destroy()} />;
                })}

                {mouseDownPort ? <Connection fromPort={mouseDownPort} toPosition={mousePosition} /> : null}
            </svg>
        </div>
    );
});
