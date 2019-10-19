import { v4 as uuid } from 'uuid';
import { observable, action, computed } from 'mobx';
import * as _ from 'lodash';

import { Node } from '../Node';
import { Connection } from '../Connection';

export abstract class Port<TValueType> {
    /**
     * Unique Identifier
     */
    @observable public id: string;

    /**
     * Port type
     */
    @observable public abstract type: PortType;

    /**
     * Port's defaultValue
     */
    @observable public defaultValue: TValueType;

    /**
     * Reference to the parent Node
     */
    @observable public node: Node;

    /**
     * Optional data store
     */
    @observable public data?: PortData;

    /**
     * Port's current value
     */
    @observable private _value: TValueType;

    /**
     * Optional validation function
     * @param value {any} - Value to validate
     */
    public validate?(value: any): Boolean;

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

        if (typeof props.validate === 'function') {
            this.validate = props.validate;
        }
    }

    /**
     * Gets the internal value
     */
    @computed public get value() {
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
    }

    /**
     * A collection of connections this port is associated with
     */
    @computed public get connections(): Connection[] {
        let portConnection: Connection[] = [];

        this.node.connections.forEach((connection: Connection) => {
            if (connection.fromPort.id === this.id || connection.toPort.id === this.id) {
                portConnection.push(connection);
            }
        });

        return portConnection;
    }

    /**
     * Boolean that flags if port is connected
     */
    @computed public get isConnected(): Boolean {
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
            data: this.data,
            validate: this.validate
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
    @action public connect(targetPort: InputPort<TValueType>): Connection {
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
    validate?: PortValidator | string;
    value?: TValueType;
    data?: PortData;
};

export type PortData = { [key: string]: any };

export type PortValidator = (value: any) => boolean;
