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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var mobx_1 = require("mobx");
var _ = require("lodash");
var helpers_1 = require("../helpers");
var Port = /** @class */ (function () {
    /**
     * Port Instance Constructor
     * @param node {Node} - The node the Port belongs to
     * @param props {PortProps} - Port Properties
     */
    function Port(node, props) {
        if (props === void 0) { props = {}; }
        _.defaults(props, {
            id: uuid_1.v4(),
            defaultValue: 0,
            data: {}
        });
        this.node = node;
        this.id = props.id;
        this.defaultValue = props.defaultValue;
        this.value = props.value || props.defaultValue;
        this.data = props.data;
        if (typeof props.validate === 'function') {
            this.validate = props.validate;
        }
        else if (typeof props.validate === 'string') {
            this.validate = eval(props.validate);
        }
    }
    Object.defineProperty(Port.prototype, "value", {
        /**
         * Gets the internal value
         */
        get: function () {
            return this._value;
        },
        /**
         * Sets the internal value
         */
        set: function (value) {
            var e_1, _a;
            this._value = value;
            if (this.validate && !this.validate(value)) {
                throw new Error('[VALIDATION ERROR] - Provided value is not assignable to port');
            }
            if (this.type === PortType.INPUT) {
                this.node.compute && this.node.compute();
            }
            if (this.type === PortType.OUTPUT) {
                try {
                    for (var _b = __values(this.connections), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var connection = _c.value;
                        connection.toPort.value = value;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Port.prototype, "connections", {
        /**
         * A collection of connections this port is associated with
         */
        get: function () {
            var _this = this;
            var portConnection = [];
            this.node.connections.forEach(function (connection) {
                if (connection.fromPort.id === _this.id || connection.toPort.id === _this.id) {
                    portConnection.push(connection);
                }
            });
            return portConnection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Port.prototype, "isConnected", {
        /**
         * Boolean that flags if port is connected
         */
        get: function () {
            return this.connections.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Serializes Port properties
     */
    Port.prototype.serialize = function () {
        return {
            id: this.id,
            defaultValue: this.defaultValue,
            value: this.value,
            data: helpers_1.serializeObject(this.data),
            validate: this.validate && this.validate.toString()
        };
    };
    __decorate([
        mobx_1.observable
    ], Port.prototype, "id", void 0);
    __decorate([
        mobx_1.observable
    ], Port.prototype, "type", void 0);
    __decorate([
        mobx_1.observable
    ], Port.prototype, "defaultValue", void 0);
    __decorate([
        mobx_1.observable
    ], Port.prototype, "node", void 0);
    __decorate([
        mobx_1.observable
    ], Port.prototype, "data", void 0);
    __decorate([
        mobx_1.observable
    ], Port.prototype, "_value", void 0);
    __decorate([
        mobx_1.computed
    ], Port.prototype, "connections", null);
    __decorate([
        mobx_1.computed
    ], Port.prototype, "isConnected", null);
    return Port;
}());
exports.Port = Port;
var InputPort = /** @class */ (function (_super) {
    __extends(InputPort, _super);
    function InputPort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Port Type
         */
        _this.type = PortType.INPUT;
        return _this;
    }
    return InputPort;
}(Port));
exports.InputPort = InputPort;
var OutputPort = /** @class */ (function (_super) {
    __extends(OutputPort, _super);
    function OutputPort() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Port Type
         */
        _this.type = PortType.OUTPUT;
        return _this;
    }
    /**
     * Connects this port with an InputPort
     * @param targetPort {InputPort} - Input Port to connect with
     */
    OutputPort.prototype.connect = function (targetPort) {
        return this.node.context.createConnection({
            fromPort: this,
            toPort: targetPort
        });
    };
    __decorate([
        mobx_1.action
    ], OutputPort.prototype, "connect", null);
    return OutputPort;
}(Port));
exports.OutputPort = OutputPort;
var PortType;
(function (PortType) {
    PortType["INPUT"] = "INPUT";
    PortType["OUTPUT"] = "OUTPUT";
})(PortType = exports.PortType || (exports.PortType = {}));
