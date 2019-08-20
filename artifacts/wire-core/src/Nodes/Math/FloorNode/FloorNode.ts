import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

export interface FloorNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
}

export interface FloorNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Floors the incoming value and assigns the result to the "result" output port
 */
export class FloorNode extends Node {
    inputPorts: FloorNodeInputPorts;
    outputPorts: FloorNodeOutputPorts;

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
        this.outputPorts.result.value = Math.floor(this.inputPorts.x.value);
    }
}
