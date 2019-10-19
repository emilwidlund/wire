import { Context } from '../../../Context';
import { PiNode } from './PiNode';

describe('Pi Node', () => {
    test('Should return PI as output', () => {
        const ctx: Context = new Context();

        const node = new PiNode(ctx);

        expect(node.outputPorts.pi.value).toBe(Math.PI);
    });
});
