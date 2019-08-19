import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from '../../../';

export interface SubtractionNodeInputPorts extends NodeInputPorts {
    a: InputPort<number>;
    b: InputPort<number>;
}

export interface SubtractionNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Subtracts input values and assigns the result to the "result" output port
 */
export class SubtractionNode extends Node {
    inputPorts: SubtractionNodeInputPorts;
    outputPorts: SubtractionNodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                a: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val)
                },
                b: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val)
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 0
                }
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        const values: number[] = Object.values(this.inputPorts).map(ip => ip.value);
        const result: number = values.reduce((acc: number, val: number) => acc - val);

        this.outputPorts.result.value = result;
    }
}