import { serializeObject } from './helpers';

describe('Helpers', () => {
    test('serializeObject() should serialize object containing functions correctly', () => {
        const obj = {
            a: 'Hello',
            b: 10,
            c: () => {
                console.log('Hello');
            },
            d: {
                e: 'Hello Again',
                f: 100,
                g: () => {
                    console.log('Hello Again');
                }
            }
        };

        const serializedObject = serializeObject(obj);

        expect(typeof serializedObject.a).toBe('string');
        expect(typeof serializedObject.b).toBe('number');
        expect(typeof serializedObject.c).toBe('string');
        expect(typeof serializedObject.d).toBe('object');
        expect(typeof serializedObject.d.e).toBe('string');
        expect(typeof serializedObject.d.f).toBe('number');
        expect(typeof serializedObject.d.g).toBe('string');
    });

    test.todo('Add test for unserializeObject()');
});
