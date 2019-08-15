"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
var Node_1 = require("./Node");
var Connection_1 = require("./Connection");
var Port_1 = require("./Port");
var Nodes = require("./nodes");
var Context = /** @class */ (function () {
    /**
     * Context Instance Constructor
     */
    function Context(props) {
        if (props === void 0) { props = {}; }
        /**
         * Optional data store
         */
        this.data = {};
        _.defaults(props, {
            id: uuid_1.v4(),
            data: {}
        });
        this.id = props.id;
        this.data = props.data;
        this.nodes = new Map();
        this.connections = new Map();
    }
    /**
     * Creates a node and adds it to the context
     * @param node {Node} - A Node
     */
    Context.prototype.addNode = function (node) {
        if (node instanceof Node_1.Node) {
            this.nodes.set(node.id, node);
            return node;
        }
    };
    /**
     * Removes a node from the context
     * @param node {Node} - Node to remove
     */
    Context.prototype.removeNode = function (node) {
        if (node instanceof Node_1.Node && this.nodes.has(node.id)) {
            this.nodes.delete(node.id);
        }
        else {
            throw new Error('[NODE REMOVAL FAILED] - Node does not exist in context');
        }
    };
    /**
     * Creates a connection between an inputPort and outputPort, and adds it to the context
     * @param connectionProps {ConnectionProps} - Connection Properties
     */
    Context.prototype.createConnection = function (connectionProps) {
        var fromPort = connectionProps.fromPort, toPort = connectionProps.toPort;
        if (fromPort.type !== Port_1.PortType.OUTPUT) {
            throw new Error('[CONNECTION FAILED] - fromPort must be of type OUTPUT');
        }
        else if (toPort.type !== Port_1.PortType.INPUT) {
            throw new Error('[CONNECTION FAILED] - toPort must be of type INPUT');
        }
        if (toPort.isConnected) {
            throw new Error('[CONNECTION FAILED] - toPort is already connected');
        }
        if (fromPort.node === toPort.node) {
            throw new Error('[CONNECTION FAILED] - Ports must be on different nodes');
        }
        if (toPort.validate && !toPort.validate(fromPort.value)) {
            throw new Error('[CONNECTION FAILED] - fromPort value is not assignable to toPort');
        }
        var connection = new Connection_1.Connection(this, connectionProps);
        if (connection) {
            this.connections.set(connection.id, connection);
            return connection;
        }
    };
    /**
     * Removes a connection from the context
     * @param connection {Connection} - Connection to remove
     */
    Context.prototype.removeConnection = function (connection) {
        if (this.connections.has(connection.id)) {
            this.connections.delete(connection.id);
        }
        else {
            throw new Error('[CONNECTION REMOVAL FAILED] - Connection does not exist in context');
        }
    };
    /**
     * Serializes Context
     */
    Context.prototype.serialize = function () {
        return {
            id: this.id,
            data: this.data,
            nodes: __spread(this.nodes.values()).map(function (node) { return node.serialize(); }),
            connections: __spread(this.connections.values()).map(function (connection) { return connection.serialize(); })
        };
    };
    /**
     * Imports a serialized Context
     * @param importableContext
     */
    Context.import = function (importableContext, customNodes) {
        var e_1, _a, e_2, _b;
        if (customNodes === void 0) { customNodes = {}; }
        var context = new this({
            id: importableContext.id
        });
        var availableNodeClasses = _.merge(Nodes, customNodes);
        try {
            for (var _c = __values(importableContext.nodes), _d = _c.next(); !_d.done; _d = _c.next()) {
                var node = _d.value;
                var n = availableNodeClasses[node.name];
                if (Object.getPrototypeOf(n) === Node_1.Node) {
                    new n(context, node);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var _loop_1 = function (connection) {
            var fromPort;
            var toPort;
            context.nodes.forEach(function (node) {
                for (var op in node.outputPorts) {
                    if (node.outputPorts[op].id === connection.fromPortId)
                        fromPort = node.outputPorts[op];
                }
                for (var ip in node.inputPorts) {
                    if (node.inputPorts[ip].id === connection.toPortId)
                        toPort = node.inputPorts[ip];
                }
            });
            context.createConnection({
                id: connection.id,
                fromPort: fromPort,
                toPort: toPort
            });
        };
        try {
            for (var _e = __values(importableContext.connections), _f = _e.next(); !_f.done; _f = _e.next()) {
                var connection = _f.value;
                _loop_1(connection);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return context;
    };
    __decorate([
        mobx_1.observable
    ], Context.prototype, "id", void 0);
    __decorate([
        mobx_1.observable
    ], Context.prototype, "data", void 0);
    __decorate([
        mobx_1.observable
    ], Context.prototype, "nodes", void 0);
    __decorate([
        mobx_1.observable
    ], Context.prototype, "connections", void 0);
    __decorate([
        mobx_1.action
    ], Context.prototype, "addNode", null);
    __decorate([
        mobx_1.action
    ], Context.prototype, "removeNode", null);
    __decorate([
        mobx_1.action
    ], Context.prototype, "createConnection", null);
    __decorate([
        mobx_1.action
    ], Context.prototype, "removeConnection", null);
    return Context;
}());
exports.Context = Context;
