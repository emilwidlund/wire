import { InputPort, OutputPort, PortProps } from './Port';
import { Context } from './Context';
import { Connection } from './Connection';
export declare abstract class Node {
    /**
     * Unique Identifier
     */
    id: string;
    /**
     * Input Ports
     */
    inputPorts: {
        [key: string]: InputPort<any>;
    };
    /**
     * Output Ports
     */
    outputPorts: {
        [key: string]: OutputPort<any>;
    };
    /**
     * Reference to the parent Context
     */
    context: Context;
    /**
     * Optional data store
     */
    data?: NodeData;
    /**
     * Node Instance Constructor
     * @param context {Context} - The context the Node belongs to
     * @param props {NodeProps} - Node Properties
     */
    constructor(context: Context, props?: NodeProps);
    /**
     * Generates Input & Output Ports
     */
    private generatePorts;
    /**
     * Initialize function which runs whenever the node is spawned
     */
    initialize?(): void;
    /**
     * Compute function which runs whenever values in inputPorts are updated
     */
    compute?(): void;
    /**
     * Cleanup function which runs just before Node is destroyed
     */
    dispose?(): void;
    /**
     * Destroys the Node
     */
    destroy(): void;
    /**
     * All connections associated to the Node
     */
    readonly connections: Connection[];
    /**
     * Serializes Node properties
     */
    serialize(): {
        id: string;
        name: string;
        inputPorts: {
            id: string;
            defaultValue: any;
            value: any;
            data: import("../helpers").UnkownObject;
            validate: string;
        }[];
        outputPorts: {
            id: string;
            defaultValue: any;
            value: any;
            data: import("../helpers").UnkownObject;
            validate: string;
        }[];
        data: import("../helpers").UnkownObject;
    };
}
export interface NodeProps {
    id?: string;
    inputPorts?: NodePortProps<any>;
    outputPorts?: NodePortProps<any>;
    data?: NodeData;
}
export declare type NodePortProps<T> = {
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
