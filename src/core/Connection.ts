import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';

import { InputPort, OutputPort } from './Port';
import { Context } from './Context';

export class Connection {
    /**
     * Unique Identifier
     */
    public id: string;

    /**
     * From Port
     */
    public fromPort: OutputPort<any>;

    /**
     * To Port
     */
    public toPort: InputPort<any>;

    /**
     * Reference the parent Context
     */
    public context: Context;

    /**
     * Connection Instance Constructor
     */
    constructor(context: Context, props: ConnectionProps) {
        _.defaults(props, {
            id: uuid()
        });

        this.context = context;

        this.id = props.id;
        this.fromPort = props.fromPort;
        this.toPort = props.toPort;

        this.toPort.value = this.fromPort.value;
    }

    /**
     * Destroys the Connection
     */
    public destroy() {
        this.context.removeConnection(this);

        this.toPort.value = this.toPort.defaultValue;
    }

    /**
     * Serializes the Connection to JSON format
     */
    public serialize() {
        return {
            id: this.id,
            fromPortId: this.fromPort.id,
            toPortId: this.toPort.id
        };
    }
}

export interface ConnectionProps {
    id?: string;
    fromPort: OutputPort<any>;
    toPort: InputPort<any>;
}
