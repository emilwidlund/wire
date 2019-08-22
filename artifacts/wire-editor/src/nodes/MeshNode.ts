import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';
import { Mesh } from 'three';

export interface MeshNodeInputPorts extends NodeInputPorts {
    rotationX: InputPort<number>;
    rotationY: InputPort<number>;
    rotationZ: InputPort<number>;
}

/**
 * Adds input values and assigns the result to the "result" output port
 */
export class MeshNode extends Node {
    inputPorts: MeshNodeInputPorts;

    mesh: Mesh;

    constructor(context: Context, props: NodeProps = {}, mesh: Mesh) {
        _.defaultsDeep(props, {
            inputPorts: {
                rotationX: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Rot X'
                    }
                },
                rotationY: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Rot Y'
                    }
                },
                rotationZ: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Rot Z'
                    }
                }
            },
            data: {
                name: 'Mesh'
            }
        } as NodeProps);

        super(context, props);

        this.mesh = mesh;
    }

    compute() {
        if (!this.mesh) return;

        this.mesh.rotation.x = this.inputPorts.rotationX.value;
        this.mesh.rotation.y = this.inputPorts.rotationY.value;
        this.mesh.rotation.z = this.inputPorts.rotationZ.value;
    }
}
