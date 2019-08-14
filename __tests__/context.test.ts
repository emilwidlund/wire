import { Context } from '../src/core';
import { AdditionNode } from '../src/core/nodes';

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
        expect(ctx.nodes).toBeInstanceOf(Map);
        expect(ctx.connections).toBeInstanceOf(Map);
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
    let serializedContextObject: any;
    beforeAll(() => {
        const ctx = new Context();
        const serializedContext = ctx.serialize();

        const serializedContextJSON = JSON.stringify(serializedContext);
        serializedContextObject = JSON.parse(serializedContextJSON);
    });

    test('Should import context from JSON', () => {
        const ctx = Context.import(serializedContextObject);
        expect(ctx).toBeInstanceOf(Context);
    });

    test('Should have an empty Map of Nodes', () => {
        const ctx = Context.import(serializedContextObject);
        contextHasEmptyNodesMap(ctx);
    });

    test('Should have an empty Map of Connections', () => {
        const ctx = Context.import(serializedContextObject);
        contextHasEmptyConnectionsMap(ctx);
    });

    test('Should create a Node and add it to the Nodes Map', () => {
        const ctx = Context.import(serializedContextObject);
        contextAddsNode(ctx);
    });

    test('Should add connections the Connections Map', () => {
        const ctx = Context.import(serializedContextObject);
        contextAddsConnection(ctx);
    });

    test('Should be serializable into JSON format', () => {
        const ctx = Context.import(serializedContextObject);
        contextSerializesToJSON(ctx);
    });
});
