import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

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
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'A'
                    }
                },
                b: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'B'
                    }
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 0
                }
            },
            data: {
                name: 'Subtraction'
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
