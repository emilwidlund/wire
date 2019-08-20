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

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            outputPorts: {
                random: {
                    defaultValue: 0,
                    value: Math.random(),
                    data: {
                        name: 'Random'
                    }
                }
            },
            data: {
                name: 'Random'
            }
        } as NodeProps);

        super(context, props);
    }
}
