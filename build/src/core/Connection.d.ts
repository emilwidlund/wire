import { InputPort, OutputPort } from './Port';
import { Context } from './Context';
export declare class Connection {
    /**
     * Unique Identifier
     */
    id: string;
    /**
     * From Port
     */
    fromPort: OutputPort<any>;
    /**
     * To Port
     */
    toPort: InputPort<any>;
    /**
     * Reference the parent Context
     */
    context: Context;
    /**
     * Connection Instance Constructor
     */
    constructor(context: Context, props: ConnectionProps);
    /**
     * Destroys the Connection
     */
    destroy(): void;
    /**
     * Serializes the Connection to JSON format
     */
    serialize(): {
        id: string;
        fromPortId: string;
        toPortId: string;
    };
}
export interface ConnectionProps {
    id?: string;
    fromPort: OutputPort<any>;
    toPort: InputPort<any>;
}
