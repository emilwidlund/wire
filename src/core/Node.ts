import * as uuid from 'uuid/v4';
import * as _ from 'lodash';

import { InputPort, OutputPort, PortProps } from './Port';
import { Context } from './Context';
import { Connection } from './Connection';
import { serializeObject } from '../helpers';

export class Node {
    /**
     * Unique Identifier
     */
    public id: string;

    /**
     * Name of the Node
     */
    public name: string;

    /**
     * Input Ports
     */
    public inputPorts: { [key: string]: InputPort } = {};

    /**
     * Output Ports
     */
    public outputPorts: { [key: string]: OutputPort } = {};

    /**
     * Reference to the parent Context
     */
    public context: Context;

    /**
     * Optional data store
     */
    public data?: NodeData = {};

    /**
     * Node Instance Constructor
     * @param context {Context} - The context the Node belongs to
     * @param props {NodeProps} - Node Properties
     */
    constructor(context: Context, props: NodeProps) {
        _.defaults(props, {
            id: uuid(),
            name: 'Unititled',
            inputPorts: {},
            outputPorts: {},
            data: {}
        } as NodeProps);

        this.context = context;

        this.id = props.id;
        this.name = props.name;
        this.data = props.data;

        this.buildPorts(props);
        this.buildProcessFunctions(props);

        this.initialize && this.initialize();
        this.compute && this.compute();
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
    public destroy() {
        this.cleanup && this.cleanup();

        this.context.removeNode(this);

        for (const connection of this.connections) {
            connection.destroy();
        }
    }

    /**
     * All connections associated to the Node
     */
    public get connections(): Connection[] {
        let pinConnections: Connection[] = [];

        this.context.connections.forEach(connection => {
            if (connection.fromPort.node.id === this.id || connection.toPort.node.id === this.id) {
                pinConnections.push(connection);
            }
        });

        return pinConnections;
    }

    /**
     * Build node ports
     * @param nodeProps {NodeProps} - Node Properties
     */
    private buildPorts(nodeProps: NodeProps) {
        if (typeof nodeProps.inputPorts === 'object') {
            for (const inputPort in nodeProps.inputPorts) {
                this.inputPorts[inputPort] = new InputPort(this, nodeProps.inputPorts[inputPort]);
            }
        }

        if (typeof nodeProps.outputPorts === 'object') {
            for (const outputPort in nodeProps.outputPorts) {
                this.outputPorts[outputPort] = new OutputPort(this, nodeProps.outputPorts[outputPort]);
            }
        }
    }

    /**
     * Build initialize, compute & cleanup functions
     * @param nodeProps {NodeProps} - Node Properties
     */
    private buildProcessFunctions(nodeProps: NodeProps) {
        if (typeof nodeProps.initialize === 'function') {
            this.initialize = nodeProps.initialize.bind(this);
        }

        if (typeof nodeProps.compute === 'function') {
            this.compute = nodeProps.compute.bind(this);
        }

        if (typeof nodeProps.cleanup === 'function') {
            this.cleanup = nodeProps.cleanup.bind(this);
        }
    }

    /**
     * Serializes the ports to JSON format
     */
    private serializePorts(ports: NodePorts) {
        const serializedPorts: { [key: string]: any } = {};

        for (const port in ports) {
            serializedPorts[port] = ports[port].serialize();
        }

        return serializedPorts;
    }

    /**
     * Serializes the Node to JSON format
     */
    public serialize() {
        return {
            id: this.id,
            name: this.name,
            inputPorts: this.serializePorts(this.inputPorts),
            outputPorts: this.serializePorts(this.outputPorts),
            data: serializeObject(this.data),
            initialize: this.initialize && this.initialize.toString(),
            compute: this.compute && this.compute.toString(),
            cleanup: this.cleanup && this.compute.toString()
        };
    }
}

export interface NodeProps {
    id?: string;
    name?: string;
    inputPorts?: NodePortProps;
    outputPorts?: NodePortProps;
    data?: NodeData;
    initialize?(): void;
    compute?(): void;
    cleanup?(): void;
}

export interface NodePortProps {
    [key: string]: PortProps;
}

export type NodeData = { [key: string]: any };

export interface NodePorts {
    [key: string]: InputPort | OutputPort;
}
