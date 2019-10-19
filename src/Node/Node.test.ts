import { AdditionNode } from '../Nodes';
import { Context } from '../Context';
import { InputPort, OutputPort } from '../Port';
import { Connection } from '../Connection';

describe('Node', () => {
    test('Should create a new instance', () => {
        const ctx = new Context();
        const node = new AdditionNode(ctx);

        expect(node).toBeInstanceOf(AdditionNode);

        expect(typeof node.id).toBe('string');

        expect(typeof node.inputPorts).toBe('object');
        Object.values(node.inputPorts).forEach(ip => expect(ip).toBeInstanceOf(InputPort));

        expect(typeof node.outputPorts).toBe('object');
        Object.values(node.outputPorts).forEach(op => expect(op).toBeInstanceOf(OutputPort));

        expect(ctx).toBe(ctx);
        expect(typeof node.data).toBe('object');
    });

    test('Should be self-destructable', () => {
        const ctx = new Context();
        const node = new AdditionNode(ctx);

        expect(ctx.nodes.has(node.id)).toBeTruthy();
        node.destroy();
        expect(ctx.nodes.has(node.id)).toBeFalsy();
    });

    test('Should connect with input port of other Node', () => {
        const ctx = new Context();
        const nodeA = new AdditionNode(ctx);
        const nodeB = new AdditionNode(ctx);

        const connection = nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

        expect(connection).toBeInstanceOf(Connection);
        expect(ctx.connections.has(connection.id)).toBeTruthy();
    });
});
