import { AdditionNode } from '../Nodes';
import { Context } from '../Context';
import { Connection } from './Connection';

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

    test('Should throw error when connecting to an occupied input port', () => {
        const ctx: Context = new Context();

        const nodeA = new AdditionNode(ctx);
        const nodeB = new AdditionNode(ctx);

        nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

        expect(() => {
            nodeA.outputPorts.result.connect(nodeB.inputPorts.a);
        }).toThrow();
    });

    test('Should dispose connection reaction when destroyed', () => {
        const ctx: Context = new Context();

        const nodeA = new AdditionNode(ctx);
        const nodeB = new AdditionNode(ctx);

        const connection = nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

        connection.destroy();

        nodeA.outputPorts.result.value = 100;
        expect(nodeB.inputPorts.a.value).toBe(nodeB.inputPorts.a.defaultValue);
    });
});
