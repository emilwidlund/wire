import { Context } from '../../../Context';
import { ModuloNode } from './ModuloNode';

describe('Modulo Node', () => {
    test('Should compute values correctly', () => {
        const ctx: Context = new Context();

        const node = new ModuloNode(ctx);

        node.inputPorts.a.value = 5;
        node.inputPorts.b.value = 7;

        expect(node.outputPorts.result.value).toBe(5 % 7);
    });

    test('Should pass validation when given numbers as inputs', () => {
        const ctx: Context = new Context();
        const node = new ModuloNode(ctx);

        Object.values(node.inputPorts).forEach(ip => {
            expect(ip.validate(100)).toBeTruthy();
        });
    });

    test('Should fail validation when given non-numbers as inputs', () => {
        const ctx: Context = new Context();
        const node = new ModuloNode(ctx);

        Object.values(node.inputPorts).forEach(ip => {
            expect(ip.validate('test')).toBeFalsy();
            expect(ip.validate(false)).toBeFalsy();
            expect(ip.validate([100])).toBeFalsy();
            expect(ip.validate({ test: 100 })).toBeFalsy();
        });
    });
});
