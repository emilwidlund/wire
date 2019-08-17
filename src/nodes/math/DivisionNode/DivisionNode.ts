import * as _ from 'lodash';

import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../core/Node';
import { InputPort, OutputPort } from '../../../core/Port';
import { Context } from '../../../core/Context';

export interface DivisionNodeInputPorts extends NodeInputPorts {
    a: InputPort<number>;
    b: InputPort<number>;
}

export interface DivisionNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

export class DivisionNode extends Node {
    inputPorts: DivisionNodeInputPorts;
    outputPorts: DivisionNodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                a: {
                    defaultValue: 1
                },
                b: {
                    defaultValue: 1
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 1
                }
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        const values: number[] = Object.values(this.inputPorts).map(ip => ip.value);
        const result: number = values.reduce((acc: number, val: number) => acc / val);

        this.outputPorts.result.value = result;
    }
}
