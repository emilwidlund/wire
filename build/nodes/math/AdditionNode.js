(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "lodash", "../../core"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _ = require("lodash");
    const core_1 = require("../../core");
    class AdditionNode extends core_1.Node {
        constructor(context, props = {}) {
            _.defaultsDeep(props, {
                inputPorts: {
                    a: {
                        defaultValue: 0
                    },
                    b: {
                        defaultValue: 0
                    }
                },
                outputPorts: {
                    result: {
                        defaultValue: 0
                    }
                }
            });
            super(context, props);
        }
        compute() {
            const values = Object.values(this.inputPorts).map(ip => ip.value);
            const result = values.reduce((acc, val) => acc + val, 0);
            this.outputPorts.result.value = result;
        }
    }
    exports.AdditionNode = AdditionNode;
});
