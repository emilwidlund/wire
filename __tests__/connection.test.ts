import { Context, AdditionNode, Connection } from '../src/core';

describe('Connection', () => {
    test('Should connect to compatible ports', () => {
        const ctx: Context = new Context();

        const nodeA = new AdditionNode(ctx);
        const nodeB = new AdditionNode(ctx);

        const connection = nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

        expect(connection).toBeInstanceOf(Connection);
    });

    test('Should transport value between ports', () => {
        const ctx: Context = new Context();

        const nodeA = new AdditionNode(ctx);
        const nodeB = new AdditionNode(ctx);

        const connection = nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

        connection.fromPort.value = 10;

        expect(connection.toPort.value).toBe(10);
    });

    test('Should throw error when connecting to input port on the same node', () => {
        const ctx: Context = new Context();

        const nodeA = new AdditionNode(ctx);

        expect(() => {
            nodeA.outputPorts.result.connect(nodeA.inputPorts.a);
        }).toThrow();
    });

    test('Should throw error when connecting to an output port', () => {
        const ctx: Context = new Context();

        const nodeA = new AdditionNode(ctx);
        const nodeB = new AdditionNode(ctx);

        expect(() => {
            nodeA.outputPorts.result.connect(nodeB.outputPorts.result);
        }).toThrow();
    });
});
