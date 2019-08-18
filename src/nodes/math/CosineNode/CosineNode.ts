import * as _ from 'lodash';

import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../core/Node';
import { InputPort, OutputPort } from '../../../core/Port';
import { Context } from '../../../core/Context';

export interface CosineNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
}

export interface CosineNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

export class CosineNode extends Node {
    inputPorts: CosineNodeInputPorts;
    outputPorts: CosineNodeOutputPorts;

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
        this.outputPorts.result.value = Math.cos(this.inputPorts.x.value);
    }
}
