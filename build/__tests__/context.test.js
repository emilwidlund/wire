(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../src/core", "../src/nodes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const core_1 = require("../src/core");
    const nodes_1 = require("../src/nodes");
    const contextHasEmptyNodesMap = (ctx) => {
        expect(ctx.nodes.size).toBe(0);
    };
    const contextHasEmptyConnectionsMap = (ctx) => {
        expect(ctx.connections.size).toBe(0);
    };
    const contextCreatesNode = (ctx) => {
        const node = new nodes_1.AdditionNode(ctx);
        expect(node).toBeInstanceOf(Node);
        expect(ctx.nodes.size).toBe(1);
    };
    const contextCreatesConnection = (ctx) => {
        const nodeA = new nodes_1.AdditionNode(ctx);
        const nodeB = new nodes_1.AdditionNode(ctx);
        nodeA.outputPorts.a.connect(nodeB.inputPorts.a);
        expect(ctx.connections.size).toBe(1);
    };
    const contextSerializesToJSON = (ctx) => {
        const isJSON = (jsonString) => {
            try {
                JSON.parse(jsonString);
                return true;
            }
            catch (err) {
                return false;
            }
        };
        const serializedContext = ctx.serialize();
        const serializedContextString = JSON.stringify(serializedContext);
        expect(isJSON(serializedContextString)).toBeTruthy();
    };
    describe('New Context Instance', () => {
        test('Returns a valid context when calling constructor', () => {
            const ctx = new core_1.Context();
            expect(ctx).toBeInstanceOf(core_1.Context);
            expect(typeof ctx.id).toBe('string');
            expect(typeof ctx.name).toBe('string');
            expect(ctx.nodes).toBeInstanceOf(Map);
            expect(ctx.connections).toBeInstanceOf(Map);
        });
        test('Should have an empty Map of Nodes', () => {
            const ctx = new core_1.Context();
            contextHasEmptyNodesMap(ctx);
        });
        test('Should have an empty Map of Connections', () => {
            const ctx = new core_1.Context();
            contextHasEmptyConnectionsMap(ctx);
        });
        test('Should create a Node and add it to the Nodes Map', () => {
            const ctx = new core_1.Context();
            contextCreatesNode(ctx);
        });
        test('Should add connections the Connections Map', () => {
            const ctx = new core_1.Context();
            contextCreatesConnection(ctx);
        });
        test('Should be serializable into JSON format', () => {
            const ctx = new core_1.Context();
            contextSerializesToJSON(ctx);
        });
    });
    describe('Imported Context', () => {
        let serializedContextObject;
        beforeAll(() => {
            const ctx = new core_1.Context();
            const serializedContext = ctx.serialize();
            const serializedContextJSON = JSON.stringify(serializedContext);
            serializedContextObject = JSON.parse(serializedContextJSON);
        });
        test('Should import context from JSON', () => {
            const ctx = core_1.Context.import(serializedContextObject);
            expect(ctx).toBeInstanceOf(core_1.Context);
        });
        test('Should have an empty Map of Nodes', () => {
            const ctx = core_1.Context.import(serializedContextObject);
            contextHasEmptyNodesMap(ctx);
        });
        test('Should have an empty Map of Connections', () => {
            const ctx = core_1.Context.import(serializedContextObject);
            contextHasEmptyConnectionsMap(ctx);
        });
        test('Should create a Node and add it to the Nodes Map', () => {
            const ctx = core_1.Context.import(serializedContextObject);
            contextCreatesNode(ctx);
        });
        test('Should add connections the Connections Map', () => {
            const ctx = core_1.Context.import(serializedContextObject);
            contextCreatesConnection(ctx);
        });
        test('Should be serializable into JSON format', () => {
            const ctx = core_1.Context.import(serializedContextObject);
            contextSerializesToJSON(ctx);
        });
    });
});
