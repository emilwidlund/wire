import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from '../../../';

export interface DivisionNodeInputPorts extends NodeInputPorts {
    a: InputPort<number>;
    b: InputPort<number>;
}

export interface DivisionNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Divides input values and assigns the result to the "result" output port
 */
export class DivisionNode extends Node {
    inputPorts: DivisionNodeInputPorts;
    outputPorts: DivisionNodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                a: {
                    defaultValue: 1,
                    validate: (val: any) => _.isNumber(val)
                },
                b: {
                    defaultValue: 1,
                    validate: (val: any) => _.isNumber(val)
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
