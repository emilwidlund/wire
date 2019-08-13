import * as _ from 'lodash';

import { Node, InputPort, OutputPort, NodeInputPorts, NodeOutputPorts, Context, NodeProps } from '../../core';

export interface AdditionNodeInputPorts extends NodeInputPorts {
    a: InputPort<number>;
    b: InputPort<number>;
}

export interface AdditionNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

export class AdditionNode extends Node {
    inputPorts: AdditionNodeInputPorts;
    outputPorts: AdditionNodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                a: {
                    defaultValue: 0
                },
                b: {
                    defaultValue: 0
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 0
                }
            }
        });

        super(context, props);
    }

    compute() {
        const values: number[] = Object.values(this.inputPorts).map(ip => ip.value);
        const result: number = values.reduce((acc: number, val: number) => acc + val, 0);

        this.outputPorts.result.value = result;
    }
}
