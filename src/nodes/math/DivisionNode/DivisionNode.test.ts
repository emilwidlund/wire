import { Context } from '../../../core';
import { DivisionNode } from './DivisionNode';

describe('Division Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const nodeA = new DivisionNode(ctx);

        nodeA.inputPorts.a.value = 200;
        nodeA.inputPorts.b.value = 2;

        expect(nodeA.outputPorts.result.value).toBe(200 / 2);
    });
});
