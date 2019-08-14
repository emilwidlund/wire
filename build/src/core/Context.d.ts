import { Node, NodePortProps, NodeData } from './Node';
import { Connection, ConnectionProps } from './Connection';
export declare class Context {
    /**
     * Unique Identifier
     */
    id: string;
    /**
     * Context Name
     */
    name: string;
    /**
     * Optional data store
     */
    data?: ContextData;
    /**
     * Nodes Collection
     */
    nodes: Map<string, Node>;
    /**
     * Connections Collection
     */
    connections: Map<string, Connection>;
    /**
     * Context Instance Constructor
     */
    constructor(props?: ContextProps);
    /**
     * Creates a node and adds it to the context
     * @param node {Node} - A Node
     */
    addNode(node: any): Node;
    /**
     * Removes a node from the context
     * @param node {Node} - Node to remove
     */
    removeNode(node: any): void;
    /**
     * Creates a connection between an inputPort and outputPort, and adds it to the context
     * @param connectionProps {ConnectionProps} - Connection Properties
     */
    createConnection(connectionProps: ConnectionProps): Connection;
    /**
     * Removes a connection from the context
     * @param connection {Connection} - Connection to remove
     */
    removeConnection(connection: Connection): void;
    /**
     * Serializes Context
     */
    serialize(): {
        id: string;
        data: ContextData;
        nodes: {
            id: string;
            name: string;
            inputPorts: {
                id: string;
                defaultValue: any;
                value: any;
                data: import("../helpers").UnkownObject;
            }[];
            outputPorts: {
                id: string;
                defaultValue: any;
                value: any;
                data: import("../helpers").UnkownObject;
            }[];
            data: import("../helpers").UnkownObject;
        }[];
        connections: {
            id: string;
            fromPortId: string;
            toPortId: string;
        }[];
    };
    /**
     * Imports a serialized Context
     * @param importableContext
     */
    static import(importableContext: ImportableContext, customNodes?: {
        [key: string]: any;
    }): Context;
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
