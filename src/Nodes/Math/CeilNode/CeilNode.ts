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
                name: 'Ceil'
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        this.outputPorts.result.value = Math.ceil(this.inputPorts.x.value);
    }
}
