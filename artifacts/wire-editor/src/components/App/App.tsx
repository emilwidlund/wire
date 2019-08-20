import * as React from 'react';
import { Context, AdditionNode } from 'wire-core';
import { Node } from 'wire-ui';

export interface WireContext {
    context: Context;
}

const Wire = React.createContext({} as WireContext);

export const App = () => {
    return (
        <Wire.Provider value={{ context: new Context() }}>
            <div>
                <Canvas />
            </div>
        </Wire.Provider>
    );
};

export const Canvas = () => {
    const { context } = React.useContext(Wire);

    const nodeA = new AdditionNode(context, {
        inputPorts: { a: { data: { name: 'A' } }, b: { data: { name: 'B' } } },
        outputPorts: { result: { data: { name: 'Output' } } },
        data: {
            name: 'Addition'
        }
    });
    const nodeB = new AdditionNode(context);

    nodeA.inputPorts.a.value = 150;
    nodeA.inputPorts.b.value = 500;

    nodeB.inputPorts.b.value = 700;

    nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

    return (
        <div>
            {[...context.nodes.values()].map(node => (
                <Node node={node} />
            ))}
        </div>
    );
};
