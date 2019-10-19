import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

export interface RoundNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
}

export interface RoundNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Rounds the incoming value and assigns the result to the "result" output port
 */
export class RoundNode extends Node {
    inputPorts: RoundNodeInputPorts;
    outputPorts: RoundNodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                x: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Round'
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
                name: 'Round'
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        this.outputPorts.result.value = Math.round(this.inputPorts.x.value);
    }
}
