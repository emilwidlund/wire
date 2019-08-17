import { Context } from '../../../core';
import { ModuloNode } from './ModuloNode';

describe('Modulo Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const nodeA = new ModuloNode(ctx);

        nodeA.inputPorts.a.value = 5;
        nodeA.inputPorts.b.value = 7;

        expect(nodeA.outputPorts.result.value).toBe(5 % 7);
    });
});
