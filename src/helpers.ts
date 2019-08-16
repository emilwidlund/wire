export type UnkownObject = { [key: string]: any };

export const serializeObject = (object: UnkownObject) => {
    if (typeof object !== 'object') return null;

    const recursiveObjectSerializer = (object: UnkownObject) => {
        const obj: UnkownObject = {};

        for (const key in object) {
            if (typeof object[key] === 'object') {
                obj[key] = recursiveObjectSerializer(object[key]);
            } else if (typeof object[key] === 'function') {
                obj[key] = object[key].toString();
            } else {
                obj[key] = object[key];
            }
        }

        return obj;
    };

    return recursiveObjectSerializer(object);
};
