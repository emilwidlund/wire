import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

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
