import { Context } from '../../../Context';
import { FloorNode } from './FloorNode';

describe('Floor Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const node = new FloorNode(ctx);

        node.inputPorts.x.value = 50.32893;

        expect(node.outputPorts.result.value).toBe(Math.floor(50.32893));
    });

    test('Should pass validation when given numbers as input', () => {
        const ctx: Context = new Context();
        const node = new FloorNode(ctx);

        expect(node.inputPorts.x.validate(100)).toBeTruthy();
    });

    test('Should fail validation when given non-numbers as input', () => {
        const ctx: Context = new Context();
        const node = new FloorNode(ctx);

        expect(node.inputPorts.x.validate('test')).toBeFalsy();
        expect(node.inputPorts.x.validate(false)).toBeFalsy();
        expect(node.inputPorts.x.validate([100])).toBeFalsy();
        expect(node.inputPorts.x.validate({ test: 100 })).toBeFalsy();
    });
});
