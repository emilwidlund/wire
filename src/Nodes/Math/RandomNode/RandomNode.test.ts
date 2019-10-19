import { Context } from '../../../Context';
import { RandomNode } from './RandomNode';

describe('Random Node', () => {
    test('Should return a random value', () => {
        const ctx: Context = new Context();

        const nodeA = new RandomNode(ctx);
        const nodeB = new RandomNode(ctx);

        expect(nodeA.outputPorts.random === nodeB.outputPorts.random).toBeFalsy();
    });
});
