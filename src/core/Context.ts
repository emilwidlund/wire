import * as uuid from 'uuid/v4';
import * as _ from 'lodash';

import { Node, NodeProps, NodePortProps, NodeData } from './Node';
import { Connection, ConnectionProps } from './Connection';
import { PortType, OutputPort, InputPort } from './Port';

export class Context {
    /**
     * Unique Identifier
     */
    public id: string;

    /**
     * Context Name
     */
    public name: string;

    /**
     * Nodes Collection
     */
    public nodes: Map<string, Node>;

    /**
     * Connections Collection
     */
    public connections: Map<string, Connection>;

    /**
     * Context Instance Constructor
     */
    constructor(props: ContextProps = {}) {
        _.defaults(props, {
            id: uuid(),
            name: 'Untitled'
        });

        this.id = props.id;
        this.name = props.name;

        this.nodes = new Map();
        this.connections = new Map<string, Connection>();
    }

    /**
     * Creates a node and adds it to the context
     * @param node {Node} - A Node
     */
    public createNode(nodeProps: NodeProps): Node {
        // type InputPorts = Record<keyof typeof nodeProps.inputPorts, InputPort>;
        // type InputPortsTest = { [k in keyof typeof nodeProps.inputPorts]: InputPort };

        // type OutputPorts = Record<keyof typeof nodeProps.outputPorts, OutputPort>;
        // type OutputPortsTest = { [k in keyof typeof nodeProps.outputPorts]: OutputPort };

        const node = new Node(this, nodeProps);

        if (node) {
            this.nodes.set(node.id, node);

            return node;
        }
    }

    /**
     * Removes a node from the context
     * @param node {Node} - Node to remove
     */
    public removeNode(node: Node) {
        if (this.nodes.has(node.id)) {
            this.nodes.delete(node.id);
        } else {
            throw new Error('Node Removal Failed - Node does not exist in context');
        }
    }

    /**
     * Creates a connection between an inputPort and outputPort, and adds it to the context
     * @param connectionProps {ConnectionProps} - Connection Properties
     */
    public createConnection(connectionProps: ConnectionProps): Connection {
        const { fromPort, toPort } = connectionProps;

        if (fromPort.type !== PortType.OUTPUT) {
            throw new Error('Connection Failed - fromPort must be of type OUTPUT');
        } else if (toPort.type !== PortType.INPUT) {
            throw new Error('Connection Failed - toPort must be of type INPUT');
        }

        if (toPort.isConnected) {
            throw new Error('Connection Failed - toPort is already connected');
        }

        if (fromPort.node === toPort.node) {
            throw new Error('Connection Failed - Ports must be on different nodes');
        }

        if (fromPort.valueType !== toPort.valueType) {
            throw new Error(
                `Connection Failed - Ports have different Value Types (fromPort: ${fromPort.valueType} toPort: ${toPort.valueType})`
            );
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
    public removeConnection(connection: Connection) {
        if (this.connections.has(connection.id)) {
            this.connections.delete(connection.id);
        } else {
            throw new Error('Connection Removal Failed - Connection does not exist in context');
        }
    }

    /**
     * Serializes the Context to JSON format
     */
    public serialize() {
        return {
            id: this.id,
            name: this.name,
            nodes: [...this.nodes.values()].map((node: Node) => node.serialize()),
            connections: [...this.connections.values()].map((connection: Connection) => connection.serialize())
        };
    }

    static import(importableContext: ImportableContext): Context {
        const context = new this({
            id: importableContext.id,
            name: importableContext.name
        });

        for (const node of importableContext.nodes) {
            context.createNode({
                id: node.id,
                name: node.name,
                inputPorts: node.inputPorts,
                outputPorts: node.outputPorts,
                data: node.data,
                initialize: eval(node.initialize),
                compute: eval(node.compute),
                cleanup: eval(node.cleanup)
            });
        }

        for (const connection of importableContext.connections) {
            let fromPort: OutputPort;
            let toPort: InputPort;

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
    name?: string;
}

export interface ImportableContext {
    id: string;
    name?: string;
    nodes: ImportableNode[];
    connections: ImportableConnection[];
}

export interface ImportableNode {
    id: string;
    name?: string;
    inputPorts?: NodePortProps;
    outputPorts?: NodePortProps;
    data?: NodeData;
    initialize?: string;
    compute?: string;
    cleanup?: string;
}

export interface ImportableConnection {
    id: string;
    fromPortId: string;
    toPortId: string;
}
