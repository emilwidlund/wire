import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

import { Node } from './Node';
import { Connection } from './Connection';
import { serializeObject } from '../helpers';

export abstract class Port<TValueType> {
    /**
     * Unique Identifier
     */
    public id: string;

    /**
     * Port Name
     */
    public name: string;

    /**
     * Port type
     */
    public abstract type: PortType;

    /**
     * Port's defaultValue
     */
    public defaultValue: TValueType;

    /**
     * Reference to the parent Node
     */
    public node: Node;

    /**
     * Optional data store
     */
    public data?: PortData;

    /**
     * Port's current value
     */
    private _value: TValueType;

    /**
     * Port Instance Constructor
     * @param node {Node} - The node the Port belongs to
     * @param props {PortProps} - Port Properties
     */
    constructor(node: Node, props: PortProps<TValueType> = {}) {
        _.defaults(props, {
            id: uuid(),
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
    public get value() {
        return this._value;
    }

    /**
     * Sets the internal value
     */
    public set value(value: TValueType) {
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
    public get connections(): Connection[] {
        let pinConnections: Connection[] = [];

        this.node.connections.forEach((connection: Connection) => {
            if (connection.fromPort.id === this.id || connection.toPort.id === this.id) {
                pinConnections.push(connection);
            }
        });

        return pinConnections;
    }

    /**
     * Boolean that flags if port is connected
     */
    public get isConnected(): Boolean {
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
            data: serializeObject(this.data)
        };
    }
}

export class InputPort<TValueType> extends Port<TValueType> {
    /**
     * Port Type
     */
    type = PortType.INPUT;
}

export class OutputPort<TValueType> extends Port<TValueType> {
    /**
     * Port Type
     */
    type = PortType.OUTPUT;

    /**
     * Connects this port with an InputPort
     * @param targetPort {InputPort} - Input Port to connect with
     */
    public connect(targetPort: InputPort<TValueType>): Connection {
        return this.node.context.createConnection({
            fromPort: this,
            toPort: targetPort
        });
    }
}

export enum PortType {
    INPUT = 'INPUT',
    OUTPUT = 'OUTPUT'
}

export type PortProps<TValueType> = {
    id?: string;
    defaultValue?: TValueType;
    value?: TValueType;
    data?: PortData;
};

export type PortData = { [key: string]: any };
