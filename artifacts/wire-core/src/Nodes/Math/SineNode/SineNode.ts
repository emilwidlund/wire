import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

export interface SineNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
}

export interface SineNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Applies a sine transformation to the incoming value and assigns the result to the "result" output port
 */
export class SineNode extends Node {
    inputPorts: SineNodeInputPorts;
    outputPorts: SineNodeOutputPorts;

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
                name: 'Sine'
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        this.outputPorts.result.value = Math.sin(this.inputPorts.x.value);
    }
}
