import * as React from 'react';
import { Context, AdditionNode } from 'wire-core';
import { Node } from 'wire-ui';

const Wire = React.createContext(new Context());

export const App = () => {
    return (
        <Wire.Provider value={null}>
            <div>
                <Canvas />
            </div>
        </Wire.Provider>
    );
};

export const Canvas = () => {
    const context = React.useContext(Wire);

    new AdditionNode(context);

    return (
        <div>
            {[...context.nodes.values()].map(node => (
                <Node node={node} />
            ))}
        </div>
    );
};
