import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

export interface CosineNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
}

export interface CosineNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Applies a cosine transformation to the incoming value and assigns the result to the "result" output port
 */
export class CosineNode extends Node {
    inputPorts: CosineNodeInputPorts;
    outputPorts: CosineNodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                x: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'X'
                    }
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 0,
                    data: {
                        name: 'Result'
                    }
                }
            },
            data: {
                name: 'Cosine'
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        this.outputPorts.result.value = Math.cos(this.inputPorts.x.value);
    }
}
