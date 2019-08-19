import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeOutputPorts, OutputPort } from '../../../';

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
