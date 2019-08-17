import { v4 as uuid } from 'uuid';
import { observable, action, computed, reaction, IReactionDisposer } from 'mobx';
import * as _ from 'lodash';

import { InputPort, OutputPort } from '../Port';
import { Context } from '../Context';

export class Connection {
    /**
     * Unique Identifier
     */
    @observable public id: string;

    /**
     * From Port
     */
    @observable public fromPort: OutputPort<any>;

    /**
     * To Port
     */
    @observable public toPort: InputPort<any>;

    /**
     * Reference the parent Context
     */
    @observable public context: Context;

    /**
     * Reaction Disposer
     */
    private reactionDisposer: IReactionDisposer;

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

        this.reactionDisposer = reaction(
            () => this.fromPort.value,
            value => {
                this.toPort.value = value;
            }
        );
    }

    /**
     * Destroys the Connection
     */
    @action public destroy() {
        this.context.removeConnection(this);

        this.reactionDisposer();

        this.toPort.value = this.toPort.defaultValue;
    }

    /**
     * Flag that determines if connection is valid
     * A connection is considered valid if validator on toPort runs successfuly with fromPort's value
     */
    @computed public get isValid() {
        return this.toPort.validate && this.toPort.validate(this.fromPort.value);
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
