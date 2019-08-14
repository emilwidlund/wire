"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const _ = require("lodash");
const helpers_1 = require("../helpers");
class Port {
    /**
     * Port Instance Constructor
     * @param node {Node} - The node the Port belongs to
     * @param props {PortProps} - Port Properties
     */
    constructor(node, props = {}) {
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
    }
    /**
     * Gets the internal value
     */
    get value() {
        return this._value;
    }
    /**
     * Sets the internal value
     */
    set value(value) {
        this._value = value;
        if (this.type === PortType.INPUT) {
            this.node.compute && this.node.compute();
        }
        if (this.type === PortType.OUTPUT) {
            for (const connection of this.connections) {
                connection.toPort.value = value;
            }
        }
    }
    /**
     * A collection of connections this port is associated with
     */
    get connections() {
        let pinConnections = [];
        this.node.connections.forEach((connection) => {
            if (connection.fromPort.id === this.id || connection.toPort.id === this.id) {
                pinConnections.push(connection);
            }
        });
        return pinConnections;
    }
    /**
     * Boolean that flags if port is connected
     */
    get isConnected() {
        return this.connections.length > 0;
    }
    /**
     * Serializes Port properties
     */
    serialize() {
        return {
            id: this.id,
            defaultValue: this.defaultValue,
            value: this.value,
            data: helpers_1.serializeObject(this.data)
        };
    }
}
exports.Port = Port;
class InputPort extends Port {
    constructor() {
        super(...arguments);
        /**
         * Port Type
         */
        this.type = PortType.INPUT;
    }
}
exports.InputPort = InputPort;
class OutputPort extends Port {
    constructor() {
        super(...arguments);
        /**
         * Port Type
         */
        this.type = PortType.OUTPUT;
    }
    /**
     * Connects this port with an InputPort
     * @param targetPort {InputPort} - Input Port to connect with
     */
    connect(targetPort) {
        return this.node.context.createConnection({
            fromPort: this,
            toPort: targetPort
        });
    }
}
exports.OutputPort = OutputPort;
var PortType;
(function (PortType) {
    PortType["INPUT"] = "INPUT";
    PortType["OUTPUT"] = "OUTPUT";
})(PortType = exports.PortType || (exports.PortType = {}));
