import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeInputPorts, InputPort } from 'wire-core';
import { Mesh } from 'three';

export interface MeshNodeInputPorts extends NodeInputPorts {
    x: InputPort<number>;
    y: InputPort<number>;
    z: InputPort<number>;
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
                },
                rotationX: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Rotation X'
                    }
                },
                rotationY: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Rotation Y'
                    }
                },
                rotationZ: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Rotation Z'
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

        this.mesh.position.x = this.inputPorts.x.value;
        this.mesh.position.y = this.inputPorts.y.value;
        this.mesh.position.z = this.inputPorts.z.value;

        this.mesh.rotation.x = this.inputPorts.rotationX.value;
        this.mesh.rotation.y = this.inputPorts.rotationY.value;
        this.mesh.rotation.z = this.inputPorts.rotationZ.value;
    }
}
