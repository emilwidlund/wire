import { v4 as uuid } from 'uuid';
import { observable, action, computed } from 'mobx';
import * as _ from 'lodash';

import { InputPort, OutputPort, PortProps } from './Port';
import { Context } from './Context';
import { Connection } from './Connection';
import { serializeObject } from '../helpers';

export abstract class Node {
    /**
     * Unique Identifier
     */
    @observable public id: string;

    /**
     * Input Ports
     */
    @observable public inputPorts: { [key: string]: InputPort<any> } = {};

    /**
     * Output Ports
     */
    @observable public outputPorts: { [key: string]: OutputPort<any> } = {};

    /**
     * Reference to the parent Context
     */
    @observable public context: Context;

    /**
     * Optional data store
     */
    @observable public data?: NodeData = {};

    /**
     * Node Instance Constructor
     * @param context {Context} - The context the Node belongs to
     * @param props {NodeProps} - Node Properties
     */
    constructor(context: Context, props: NodeProps = {}) {
        _.defaults(props, {
            id: uuid(),
            inputPorts: {},
            outputPorts: {},
            data: {}
        } as NodeProps);

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
    @action private generatePorts(nodeProps: NodeProps) {
        for (const inputPort in nodeProps.inputPorts) {
            this.inputPorts[inputPort] = new InputPort(this, nodeProps.inputPorts[inputPort]);
        }

        for (const outputPort in nodeProps.outputPorts) {
            this.outputPorts[outputPort] = new OutputPort(this, nodeProps.outputPorts[outputPort]);
        }
    }

    /**
     * Initialize function which runs whenever the node is spawned
     */
    public initialize?(): void;

    /**
     * Compute function which runs whenever values in inputPorts are updated
     */
    public compute?(): void;

    /**
     * Cleanup function which runs before Node is destroyed
     */
    public cleanup?(): void;

    /**
     * Destroys the Node
     */
    @action public destroy() {
        this.cleanup && this.cleanup();

        this.context.removeNode(this);

        for (const connection of this.connections) {
            connection.destroy();
        }
    }

    /**
     * All connections associated to the Node
     */
    @computed public get connections(): Connection[] {
        let portConnections: Connection[] = [];

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
            data: serializeObject(this.data)
        };
    }
}

export interface NodeProps {
    id?: string;
    inputPorts?: NodePortProps<any>;
    outputPorts?: NodePortProps<any>;
    data?: NodeData;
}

export type NodePortProps<T> = {
    [key: string]: PortProps<T>;
};

export interface NodeData {
    [key: string]: any;
}

export interface NodeInputPorts {
    [key: string]: InputPort<any>;
}

export interface NodeOutputPorts {
    [key: string]: OutputPort<any>;
}
