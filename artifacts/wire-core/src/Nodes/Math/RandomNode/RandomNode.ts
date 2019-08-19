import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeOutputPorts, OutputPort } from '../../../';

export interface RandomNodeOutputPorts extends NodeOutputPorts {
    random: OutputPort<number>;
}

/**
 * A random number
 */
export class RandomNode extends Node {
    outputPorts: RandomNodeOutputPorts;

    constructor(context: Context) {
        const props: NodeProps = {
            outputPorts: {
                random: {
                    defaultValue: 0,
                    value: Math.random()
                }
            }
        };

        super(context, props);
    }
}
