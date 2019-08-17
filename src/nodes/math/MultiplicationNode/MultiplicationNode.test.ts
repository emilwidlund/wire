import { Context } from '../../../core';
import { MultiplicationNode } from './MultiplicationNode';

describe('Multiplication Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const nodeA = new MultiplicationNode(ctx);

        nodeA.inputPorts.a.value = 100;
        nodeA.inputPorts.b.value = 100;

        expect(nodeA.outputPorts.result.value).toBe(100 * 100);
    });
});
