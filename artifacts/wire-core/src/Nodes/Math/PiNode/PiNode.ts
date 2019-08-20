import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

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
