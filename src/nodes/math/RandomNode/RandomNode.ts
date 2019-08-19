import * as _ from 'lodash';

import { Node, NodeProps, NodeOutputPorts } from '../../../core/Node';
import { OutputPort } from '../../../core/Port';
import { Context } from '../../../core/Context';

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
