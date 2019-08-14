(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serializeObject = (object) => {
        if (typeof object !== 'object')
            return null;
        const recursiveDataSerializer = (object) => {
            const obj = {};
            for (const key in object) {
                if (typeof object[key] === 'object') {
                    obj[key] = recursiveDataSerializer(object[key]);
                }
                else if (typeof object[key] === 'function') {
                    obj[key] = object[key].toString();
                }
                else {
                    obj[key] = object[key];
                }
            }
            return obj;
        };
        return recursiveDataSerializer(object);
    };
});
