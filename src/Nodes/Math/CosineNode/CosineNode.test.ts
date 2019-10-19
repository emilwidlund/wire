import { Context } from '../../../Context';
import { CosineNode } from './CosineNode';

describe('Cosine Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const node = new CosineNode(ctx);

        node.inputPorts.x.value = 100;

        expect(node.outputPorts.result.value).toBe(Math.cos(100));
    });

    test('Should pass validation when given numbers as input', () => {
        const ctx: Context = new Context();
        const node = new CosineNode(ctx);

        expect(node.inputPorts.x.validate(100)).toBeTruthy();
    });

    test('Should fail validation when given non-numbers as input', () => {
        const ctx: Context = new Context();
        const node = new CosineNode(ctx);

        expect(node.inputPorts.x.validate('test')).toBeFalsy();
        expect(node.inputPorts.x.validate(false)).toBeFalsy();
        expect(node.inputPorts.x.validate([100])).toBeFalsy();
        expect(node.inputPorts.x.validate({ test: 100 })).toBeFalsy();
    });
});
