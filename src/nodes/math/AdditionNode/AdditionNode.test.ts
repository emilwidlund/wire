import { Context } from '../../../core';
import { AdditionNode } from './AdditionNode';

describe('Addition Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const nodeA = new AdditionNode(ctx);

        nodeA.inputPorts.a.value = 100;
        nodeA.inputPorts.b.value = 100;

        expect(nodeA.outputPorts.result.value).toBe(200);
    });
});
