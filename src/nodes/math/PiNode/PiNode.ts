import * as _ from 'lodash';

import { Node, NodeProps, NodeOutputPorts } from '../../../core/Node';
import { OutputPort } from '../../../core/Port';
import { Context } from '../../../core/Context';

export interface PiNodeOutputPorts extends NodeOutputPorts {
    pi: OutputPort<number>;
}

/**
 * Value of PI
 */
export class PiNode extends Node {
    outputPorts: PiNodeOutputPorts;

    constructor(context: Context) {
        const props: NodeProps = {
            outputPorts: {
                pi: {
                    defaultValue: Math.PI
                }
            }
        };

        super(context, props);
    }
}
