"use strict";
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
var Port_1 = require("./Port");
var helpers_1 = require("../helpers");
var Node = /** @class */ (function () {
    /**
     * Node Instance Constructor
     * @param context {Context} - The context the Node belongs to
     * @param props {NodeProps} - Node Properties
     */
    function Node(context, props) {
        if (props === void 0) { props = {}; }
        /**
         * Input Ports
         */
        this.inputPorts = {};
        /**
         * Output Ports
         */
        this.outputPorts = {};
        /**
         * Optional data store
         */
        this.data = {};
        _.defaults(props, {
            id: uuid_1.v4(),
            inputPorts: {},
            outputPorts: {},
            data: {}
        });
        this.context = context;
        this.id = props.id;
        this.data = props.data;
        this.generatePorts(props);
        context.addNode(this);
        this.initialize && this.initialize();
        this.compute && this.compute();
    }
    /**
     * Generates Input & Output Ports
     */
    Node.prototype.generatePorts = function (nodeProps) {
        for (var inputPort in nodeProps.inputPorts) {
            this.inputPorts[inputPort] = new Port_1.InputPort(this, nodeProps.inputPorts[inputPort]);
        }
        for (var outputPort in nodeProps.outputPorts) {
            this.outputPorts[outputPort] = new Port_1.OutputPort(this, nodeProps.outputPorts[outputPort]);
        }
    };
    /**
     * Destroys the Node
     */
    Node.prototype.destroy = function () {
        var e_1, _a;
        this.cleanup && this.cleanup();
        this.context.removeNode(this);
        try {
            for (var _b = __values(this.connections), _c = _b.next(); !_c.done; _c = _b.next()) {
                var connection = _c.value;
                connection.destroy();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Object.defineProperty(Node.prototype, "connections", {
        /**
         * All connections associated to the Node
         */
        get: function () {
            var _this = this;
            var portConnections = [];
            this.context.connections.forEach(function (connection) {
                if (connection.fromPort.node.id === _this.id || connection.toPort.node.id === _this.id) {
                    portConnections.push(connection);
                }
            });
            return portConnections;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Serializes Node properties
     */
    Node.prototype.serialize = function () {
        return {
            id: this.id,
            name: this.constructor.name,
            inputPorts: Object.values(this.inputPorts).map(function (ip) { return ip.serialize(); }),
            outputPorts: Object.values(this.outputPorts).map(function (op) { return op.serialize(); }),
            data: helpers_1.serializeObject(this.data)
        };
    };
    __decorate([
        mobx_1.observable
    ], Node.prototype, "id", void 0);
    __decorate([
        mobx_1.observable
    ], Node.prototype, "inputPorts", void 0);
    __decorate([
        mobx_1.observable
    ], Node.prototype, "outputPorts", void 0);
    __decorate([
        mobx_1.observable
    ], Node.prototype, "context", void 0);
    __decorate([
        mobx_1.observable
    ], Node.prototype, "data", void 0);
    __decorate([
        mobx_1.action
    ], Node.prototype, "generatePorts", null);
    __decorate([
        mobx_1.action
    ], Node.prototype, "destroy", null);
    __decorate([
        mobx_1.computed
    ], Node.prototype, "connections", null);
    return Node;
}());
exports.Node = Node;
