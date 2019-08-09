import * as uuid from 'uuid/v4';
import * as _ from 'lodash';

import { Node } from './Node';
import { Connection } from './Connection';
import { serializeObject } from '../helpers';

export abstract class Port {
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
    public defaultValue: PortValue;

    /**
     * Port Value's type
     */
    public valueType: PortValueType;

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
    private _value: PortValue;

    /**
     * Port Instance Constructor
     * @param node {Node} - The node the Port belongs to
     * @param props {PortProps} - Port Properties
     */
    constructor(node: Node, props: PortProps) {
        _.defaults(props, {
            id: uuid(),
            name: 'Untitled',
            valueType: PortValueType.NUMBER,
            defaultValue: 0,
            data: {}
        });

        this.node = node;

        this.id = props.id;
        this.name = props.name;
        this.defaultValue = props.defaultValue;
        this.value = props.value || props.defaultValue;
        this.valueType = props.valueType;
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
    public set value(value: PortValue) {
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

        this.node.connections.forEach(connection => {
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
     * Serializes the Port to JSON format
     */
    public serialize() {
        return {
            id: this.id,
            name: this.name,
            defaultValue: this.defaultValue,
            value: this.value,
            valueType: this.valueType,
            data: serializeObject(this.data)
        };
    }
}

export class InputPort extends Port {
    /**
     * Port Type
     */
    type = PortType.INPUT;
}

export class OutputPort extends Port {
    /**
     * Port Type
     */
    type = PortType.OUTPUT;

    /**
     * Connects this port with an InputPort
     * @param targetPort {InputPort} - Input Port to connect with
     */
    public connect(targetPort: InputPort): Connection {
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

export type PortValue = number | boolean | string | object | number[] | boolean[] | string[] | object[];

export enum PortValueType {
    NUMBER = 'NUMBER',
    BOOLEAN = 'BOOLEAN',
    STRING = 'STRING',
    OBJECT = 'OBJECT',
    NUMBER_ARRAY = 'NUMBER_ARRAY',
    BOOLEAN_ARRAY = 'BOOLEAN_ARRAY',
    STRING_ARRAY = 'STRING_ARRAY',
    OBJECT_ARRAY = 'OBJECT_ARRAY'
}

export interface PortProps {
    id?: string;
    name?: string;
    valueType?: PortValueType;
    defaultValue?: PortValue;
    value?: PortValue;
    data?: PortData;
}

export type PortData = { [key: string]: any };
