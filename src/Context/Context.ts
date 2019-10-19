import { v4 as uuid } from 'uuid';
import { observable, action } from 'mobx';
import * as serialize from 'serialize-javascript';
import * as _ from 'lodash';

import { Node, NodePortProps, NodeData } from '../Node';
import { Connection, ConnectionProps } from '../Connection';
import { PortType, OutputPort, InputPort } from '../Port';
import * as Nodes from '../Nodes';

export class Context {
    /**
     * Unique Identifier
     */
    @observable public id: string;

    /**
     * Optional data store
     */
    @observable public data?: ContextData = {};

    /**
     * Nodes Collection
     */
    @observable public nodes: Map<string, Node>;

    /**
     * Connections Collection
     */
    @observable public connections: Map<string, Connection>;

    /**
     * Context Instance Constructor
     */
    constructor(props: ContextProps = {}) {
        _.defaults(props, {
            id: uuid(),
            data: {}
        });

        this.id = props.id;
        this.data = props.data;

        this.nodes = new Map<string, Node>();
        this.connections = new Map<string, Connection>();
    }

    /**
     * Creates a node and adds it to the context
     * @param node {Node} - A Node
     */
    @action public addNode(node: any) {
        if (node instanceof Node) {
            this.nodes.set(node.id, node);

            return node;
        }
    }

    /**
     * Removes a node from the context
     * @param node {Node} - Node to remove
     */
    @action public removeNode(node: any) {
        if (node instanceof Node && this.nodes.has(node.id)) {
            this.nodes.delete(node.id);
        } else {
            throw new Error('[NODE REMOVAL FAILED] - Node does not exist in context');
        }
    }

    /**
     * Creates a connection between an inputPort and outputPort, and adds it to the context
     * @param connectionProps {ConnectionProps} - Connection Properties
     */
    @action public createConnection(connectionProps: ConnectionProps): Connection {
        const { fromPort, toPort } = connectionProps;

        if (fromPort.type !== PortType.OUTPUT) {
            throw new Error('[CONNECTION FAILED] - fromPort must be of type OUTPUT');
        } else if (toPort.type !== PortType.INPUT) {
            throw new Error('[CONNECTION FAILED] - toPort must be of type INPUT');
        }

        if (toPort.isConnected) {
            throw new Error('[CONNECTION FAILED] - toPort is already connected');
        }

        if (fromPort.node === toPort.node) {
            throw new Error('[CONNECTION FAILED] - Ports must be on different nodes');
        }

        const connection = new Connection(this, connectionProps);

        if (connection) {
            this.connections.set(connection.id, connection);

            return connection;
        }
    }

    /**
     * Removes a connection from the context
     * @param connection {Connection} - Connection to remove
     */
    @action public removeConnection(connection: Connection) {
        if (this.connections.has(connection.id)) {
            this.connections.delete(connection.id);
        } else {
            throw new Error('[CONNECTION REMOVAL FAILED] - Connection does not exist in context');
        }
    }

    /**
     * Serializes Context to JSON
     */
    serialize() {
        return serialize({
            id: this.id,
            data: this.data,
            nodes: Array.from(this.nodes.values()).map(node => node.serialize()),
            connections: Array.from(this.connections.values()).map(connection => connection.serialize())
        });
    }

    /**
     * Imports a serialized Context
     * @param importableContextJSON {string} - Importable Context as JSON
     */
    static import(importableContextJSON: string, customNodes: { [key: string]: any } = {}): Context {
        const importableContext: ImportableContext = eval(`(${importableContextJSON})`);

        const context = new this({
            id: importableContext.id
        });

        const availableNodeClasses = _.merge(Nodes, customNodes);

        for (const node of importableContext.nodes) {
            const n = availableNodeClasses[node.name];
            if (Object.getPrototypeOf(n) === Node) {
                new n(context, node);
            }
        }

        for (const connection of importableContext.connections) {
            let fromPort: OutputPort<any>;
            let toPort: InputPort<any>;

            context.nodes.forEach(node => {
                for (const op in node.outputPorts) {
                    if (node.outputPorts[op].id === connection.fromPortId) fromPort = node.outputPorts[op];
                }

                for (const ip in node.inputPorts) {
                    if (node.inputPorts[ip].id === connection.toPortId) toPort = node.inputPorts[ip];
                }
            });

            context.createConnection({
                id: connection.id,
                fromPort,
                toPort
            });
        }

        return context;
    }
}

export interface ContextProps {
    id?: string;
    data?: NodeData;
}

export interface ContextData {
    [key: string]: any;
}

export interface ImportableContext {
    id: string;
    data?: ContextData;
    nodes: ImportableNode[];
    connections: ImportableConnection[];
}

export interface ImportableNode {
    id: string;
    name: string;
    inputPorts?: NodePortProps<any>;
    outputPorts?: NodePortProps<any>;
    data?: NodeData;
}

export interface ImportableConnection {
    id: string;
    fromPortId: string;
    toPortId: string;
}
