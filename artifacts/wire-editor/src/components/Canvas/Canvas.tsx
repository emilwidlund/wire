import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { AdditionNode, Connection as _Connection, Context } from 'wire-core';
import { Node, Connection } from 'wire-ui';

interface ConnectionsProps {
    context: Context;
}

export const Canvas = observer(({ context }: ConnectionsProps) => {
    React.useEffect(() => {
        // const nodeA = new AdditionNode(context, { data: { position: { x: 0, y: 0 } } });
        // const nodeB = new AdditionNode(context, { data: { position: { x: 0, y: 0 } } });

        // nodeA.inputPorts.a.value = 150;
        // nodeA.inputPorts.b.value = 500;

        // nodeB.inputPorts.b.value = 700;

        // nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

        setInterval(() => {
            [...context.nodes.values()][0].inputPorts.a.value += 10;
        }, 500);

        setInterval(() => {
            localStorage.setItem('wire_context', context.serialize());
        }, 2000);
    }, []);

    return (
        <div>
            {[...context.nodes.values()].map(node => (
                <Node key={node.id} node={node} />
            ))}

            <svg className="connections" width="100%" height="100%">
                {[...context.connections.values()].map((c: _Connection) => {
                    return <Connection key={c.id} connection={c} onClick={() => c.destroy()} />;
                })}
            </svg>
        </div>
    );
});
