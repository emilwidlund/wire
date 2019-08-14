"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Node_1 = require("../../Node");
var AdditionNode = /** @class */ (function (_super) {
    __extends(AdditionNode, _super);
    function AdditionNode(context, props) {
        if (props === void 0) { props = {}; }
        var _this = this;
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
        _this = _super.call(this, context, props) || this;
        return _this;
    }
    AdditionNode.prototype.compute = function () {
        var values = Object.values(this.inputPorts).map(function (ip) { return ip.value; });
        var result = values.reduce(function (acc, val) { return acc + val; }, 0);
        this.outputPorts.result.value = result;
    };
    return AdditionNode;
}(Node_1.Node));
exports.AdditionNode = AdditionNode;
