"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mobx_1 = require("mobx");
const _ = require("lodash");
const Port_1 = require("./Port");
const helpers_1 = require("../helpers");
class Node {
    /**
     * Node Instance Constructor
     * @param context {Context} - The context the Node belongs to
     * @param props {NodeProps} - Node Properties
     */
    constructor(context, props = {}) {
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
    generatePorts(nodeProps) {
        for (const inputPort in nodeProps.inputPorts) {
            this.inputPorts[inputPort] = new Port_1.InputPort(this, nodeProps.inputPorts[inputPort]);
        }
        for (const outputPort in nodeProps.outputPorts) {
            this.outputPorts[outputPort] = new Port_1.OutputPort(this, nodeProps.outputPorts[outputPort]);
        }
    }
    /**
     * Destroys the Node
     */
    destroy() {
        this.cleanup && this.cleanup();
        this.context.removeNode(this);
        for (const connection of this.connections) {
            connection.destroy();
        }
    }
    /**
     * All connections associated to the Node
     */
    get connections() {
        let portConnections = [];
        this.context.connections.forEach(connection => {
            if (connection.fromPort.node.id === this.id || connection.toPort.node.id === this.id) {
                portConnections.push(connection);
            }
        });
        return portConnections;
    }
    /**
     * Serializes Node properties
     */
    serialize() {
        return {
            id: this.id,
            name: this.constructor.name,
            inputPorts: Object.values(this.inputPorts).map(ip => ip.serialize()),
            outputPorts: Object.values(this.outputPorts).map(op => op.serialize()),
            data: helpers_1.serializeObject(this.data)
        };
    }
}
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
exports.Node = Node;
