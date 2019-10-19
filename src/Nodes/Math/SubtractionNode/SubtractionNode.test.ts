import { Context } from '../../../Context';
import { SubtractionNode } from './SubtractionNode';

describe('Subtraction Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const node = new SubtractionNode(ctx);

        node.inputPorts.a.value = 100;
        node.inputPorts.b.value = 50;

        expect(node.outputPorts.result.value).toBe(100 - 50);
    });

    test('Should pass validation when given numbers as inputs', () => {
        const ctx: Context = new Context();
        const node = new SubtractionNode(ctx);

        Object.values(node.inputPorts).forEach(ip => {
            expect(ip.validate(100)).toBeTruthy();
        });
    });

    test('Should fail validation when given non-numbers as inputs', () => {
        const ctx: Context = new Context();
        const node = new SubtractionNode(ctx);

        Object.values(node.inputPorts).forEach(ip => {
            expect(ip.validate('test')).toBeFalsy();
            expect(ip.validate(false)).toBeFalsy();
            expect(ip.validate([100])).toBeFalsy();
            expect(ip.validate({ test: 100 })).toBeFalsy();
        });
    });
});
