import { Context } from '../../../core';
import { SubtractionNode } from './SubtractionNode';

describe('Subtraction Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const nodeA = new SubtractionNode(ctx);

        nodeA.inputPorts.a.value = 100;
        nodeA.inputPorts.b.value = 50;

        expect(nodeA.outputPorts.result.value).toBe(50);
    });
});
