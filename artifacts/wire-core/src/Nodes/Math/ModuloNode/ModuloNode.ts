import * as _ from 'lodash';

import { Context } from '../../../Context';
import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../../Node';
import { InputPort, OutputPort } from '../../../Port';

export interface ModuloNodeInputPorts extends NodeInputPorts {
    a: InputPort<number>;
    b: InputPort<number>;
}

export interface ModuloNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

/**
 * Applies a modulo operator on the input values and assigns the result to the "result" output port
 */
export class ModuloNode extends Node {
    inputPorts: ModuloNodeInputPorts;
    outputPorts: ModuloNodeOutputPorts;

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
                    defaultValue: 0,
                    data: {
                        name: 'Result'
                    }
                }
            },
            data: {
                name: 'Modulo'
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        const values: number[] = Object.values(this.inputPorts).map(ip => ip.value);
        const result: number = values.reduce((acc: number, val: number) => acc % val);

        this.outputPorts.result.value = result;
    }
}
