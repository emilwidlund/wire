import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { get } from 'mobx';
import { AdditionNode, Connection as _Connection, Context, InputPort, OutputPort } from 'wire-core';
import { Node, Connection } from 'wire-ui';

interface ConnectionsProps {
    context: Context;
}

export const Canvas = observer(({ context }: ConnectionsProps) => {
    const [mouseDownPort, setMouseDownPort] = React.useState<OutputPort<any>>(null);

    React.useEffect(() => {
        const nodeA = new AdditionNode(context);
        const nodeB = new AdditionNode(context);

        nodeA.inputPorts.a.value = 150;
        nodeA.inputPorts.b.value = 500;

        nodeB.inputPorts.b.value = 700;

        nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

        // setInterval(() => {
        //     nodeA.inputPorts.a.value += 10;
        // }, 500);

        setInterval(() => {
            localStorage.setItem('wire_context', context.serialize());
        }, 2000);
    }, []);

    return (
        <div
            id="canvas"
            onMouseUp={() => {
                setMouseDownPort(null);
            }}
        >
            {Array.from(context.nodes.values()).map(node => (
                <Node
                    key={node.id}
                    node={node}
                    selected={false}
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

            <svg className="connections" width="100%" height="100%">
                {Array.from(context.connections.values()).map((c: _Connection) => {
                    return <Connection key={c.id} connection={c} onClick={() => c.destroy()} />;
                })}

                {mouseDownPort ? <Connection fromPort={mouseDownPort} toPosition={{ x: 300, y: 600 }} /> : null}
            </svg>
        </div>
    );
});
