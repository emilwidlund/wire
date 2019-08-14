"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Node_1 = require("../../Node");
class AdditionNode extends Node_1.Node {
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
