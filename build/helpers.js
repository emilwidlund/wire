"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeObject = function (object) {
    if (typeof object !== 'object')
        return null;
    var recursiveDataSerializer = function (object) {
        var obj = {};
        for (var key in object) {
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
