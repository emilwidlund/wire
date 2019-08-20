import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

export interface CeilNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
}

export interface CeilNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Ceils the incoming value and assigns the result to the "result" output port
 */
export class CeilNode extends Node {
    inputPorts: CeilNodeInputPorts;
    outputPorts: CeilNodeOutputPorts;

    constructor(context: Context) {
        const props: NodeProps = {
            inputPorts: {
                x: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val)
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 0
                }
            }
        };

        super(context, props);
    }

    compute() {
        this.outputPorts.result.value = Math.ceil(this.inputPorts.x.value);
    }
}
