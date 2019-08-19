import { ObservableMap } from 'mobx';

import { AdditionNode } from '../Nodes';
import { Context } from './Context';

const contextHasEmptyNodesMap = (ctx: Context) => {
    expect(ctx.nodes.size).toBe(0);
};

const contextHasEmptyConnectionsMap = (ctx: Context) => {
    expect(ctx.connections.size).toBe(0);
};

const contextAddsNode = (ctx: Context) => {
    const node = new AdditionNode(ctx);

    expect(ctx.nodes.has(node.id)).toBeTruthy();
};

const contextAddsConnection = (ctx: Context) => {
    const nodeA = new AdditionNode(ctx);
    const nodeB = new AdditionNode(ctx);

    nodeA.outputPorts.result.connect(nodeB.inputPorts.a);
    expect(ctx.connections.size).toBe(1);
};

const contextSerializesToJSON = (ctx: Context) => {
    const isJSON = (jsonString: string) => {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (err) {
            return false;
        }
    };

    const serializedContext = ctx.serialize();
    const serializedContextString = JSON.stringify(serializedContext);
    expect(isJSON(serializedContextString)).toBeTruthy();
};

describe('New Context Instance', () => {
    test('Returns a valid context when calling constructor', () => {
        const ctx = new Context();

        expect(ctx).toBeInstanceOf(Context);

        expect(typeof ctx.id).toBe('string');
        expect(typeof ctx.data).toBe('object');
        expect(ctx.nodes).toBeInstanceOf(ObservableMap);
        expect(ctx.connections).toBeInstanceOf(ObservableMap);
    });

    test('Should have an empty Map of Nodes', () => {
        const ctx = new Context();
        contextHasEmptyNodesMap(ctx);
    });

    test('Should have an empty Map of Connections', () => {
        const ctx = new Context();
        contextHasEmptyConnectionsMap(ctx);
    });

    test('Should create a Node and add it to the Nodes Map', () => {
        const ctx = new Context();
        contextAddsNode(ctx);
    });

    test('Should add connections the Connections Map', () => {
        const ctx = new Context();
        contextAddsConnection(ctx);
    });

    test('Should be serializable into JSON format', () => {
        const ctx = new Context();
        contextSerializesToJSON(ctx);
    });
});

describe('Imported Context', () => {
    let serializedContext: string;

    beforeAll(() => {
        const ctx = new Context();
        serializedContext = ctx.serialize();
    });

    test('Should import context from JSON', () => {
        const ctx = Context.import(serializedContext);

        expect(ctx).toBeInstanceOf(Context);

        expect(typeof ctx.id).toBe('string');
        expect(typeof ctx.data).toBe('object');
        expect(ctx.nodes).toBeInstanceOf(ObservableMap);
        expect(ctx.connections).toBeInstanceOf(ObservableMap);
    });

    test('Should have an empty Map of Nodes', () => {
        const ctx = Context.import(serializedContext);
        contextHasEmptyNodesMap(ctx);
    });

    test('Should have an empty Map of Connections', () => {
        const ctx = Context.import(serializedContext);
        contextHasEmptyConnectionsMap(ctx);
    });

    test('Should create a Node and add it to the Nodes Map', () => {
        const ctx = Context.import(serializedContext);
        contextAddsNode(ctx);
    });

    test('Should add connections the Connections Map', () => {
        const ctx = Context.import(serializedContext);
        contextAddsConnection(ctx);
    });

    test('Should be serializable into JSON format', () => {
        const ctx = Context.import(serializedContext);
        contextSerializesToJSON(ctx);
    });

    test('Should persist serialized functions', () => {
        const ctx: Context = new Context();
        const node = new AdditionNode(ctx);

        node.data = {
            testFunction: () => {
                return 'Hello';
            }
        };

        const _serializedContext = ctx.serialize();
        const importedContext: Context = Context.import(_serializedContext);

        expect(typeof importedContext.nodes.get(node.id).data.testFunction).toBe('function');
        expect(importedContext.nodes.get(node.id).data.testFunction()).toBe('Hello');
    });
});
