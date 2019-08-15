import { Node } from './Node';
import { Connection } from './Connection';
export declare abstract class Port<TValueType> {
    /**
     * Unique Identifier
     */
    id: string;
    /**
     * Port type
     */
    abstract type: PortType;
    /**
     * Port's defaultValue
     */
    defaultValue: TValueType;
    /**
     * Reference to the parent Node
     */
    node: Node;
    /**
     * Optional data store
     */
    data?: PortData;
    /**
     * Port's current value
     */
    private _value;
    /**
     * Optional validation function
     * @param value {any} - Value to validate
     */
    validate?(value: any): Boolean;
    /**
     * Port Instance Constructor
     * @param node {Node} - The node the Port belongs to
     * @param props {PortProps} - Port Properties
     */
    constructor(node: Node, props?: PortProps<TValueType>);
    /**
     * Gets the internal value
     */
    /**
    * Sets the internal value
    */
    value: TValueType;
    /**
     * A collection of connections this port is associated with
     */
    readonly connections: Connection[];
    /**
     * Boolean that flags if port is connected
     */
    readonly isConnected: Boolean;
    /**
     * Serializes Port properties
     */
    serialize(): {
        id: string;
        defaultValue: TValueType;
        value: TValueType;
        data: import("../helpers").UnkownObject;
        validate: string;
    };
}
export declare class InputPort<TValueType> extends Port<TValueType> {
    /**
     * Port Type
     */
    type: PortType;
}
export declare class OutputPort<TValueType> extends Port<TValueType> {
    /**
     * Port Type
     */
    type: PortType;
    /**
     * Connects this port with an InputPort
     * @param targetPort {InputPort} - Input Port to connect with
     */
    connect(targetPort: InputPort<TValueType>): Connection;
}
export declare enum PortType {
    INPUT = "INPUT",
    OUTPUT = "OUTPUT"
}
export declare type PortProps<TValueType> = {
    id?: string;
    defaultValue?: TValueType;
    validate?: PortValidator | string;
    value?: TValueType;
    data?: PortData;
};
export declare type PortData = {
    [key: string]: any;
};
export declare type PortValidator = (value: any) => boolean;
