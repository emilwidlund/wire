import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';
import { Mesh, Vector3 } from 'three';

export interface Vector3NodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
    y: InputPort<number>;
    z: InputPort<number>;
}

export interface Vector3NodeOutputPorts extends NodeOutputPorts {
    vector3: OutputPort<Vector3>;
}

/**
 * Adds input values and assigns the result to the "result" output port
 */
export class Vector3Node extends Node {
    inputPorts: Vector3NodeInputPorts;
    outputPorts: Vector3NodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                x: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'X'
                    }
                },
                y: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Y'
                    }
                },
                z: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Z'
                    }
                }
            },
            outputPorts: {
                vector3: {
                    defaultValue: new Vector3(0, 0, 0),
                    validate: (val: any) => val instanceof Vector3,
                    data: {
                        name: 'Vector3'
                    }
                }
            },
            data: {
                name: 'Vector3'
            }
        } as NodeProps);

        super(context, props);
    }

    compute() {
        this.outputPorts.vector3.value = new Vector3(
            this.inputPorts.x.value,
            this.inputPorts.y.value,
            this.inputPorts.z.value
        );
    }
}
