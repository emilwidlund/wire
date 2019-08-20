import * as React from 'react';
import { Context, AdditionNode } from 'wire-core';
import { Node } from 'wire-ui';
import { observer } from 'mobx-react-lite';

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

export const Canvas = observer(() => {
    const { context } = React.useContext(Wire);

    React.useEffect(() => {
        const nodeA = new AdditionNode(context);
        const nodeB = new AdditionNode(context);

        nodeA.inputPorts.a.value = 150;
        nodeA.inputPorts.b.value = 500;

        nodeB.inputPorts.b.value = 700;

        nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

        console.log(nodeA);

        setInterval(() => {
            nodeA.inputPorts.a.value += 10;
        }, 500);
    }, []);

    return (
        <div>
            {context.nodes.size}
            {[...context.nodes.values()].map(node => (
                <Node node={node} />
            ))}
        </div>
    );
});
