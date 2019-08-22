import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';
import { Mesh } from 'three';

export interface TimerNodeOutputPorts extends NodeOutputPorts {
    milliseconds: OutputPort<number>;
}

/**
 * Adds input values and assigns the result to the "result" output port
 */
export class TimerNode extends Node {
    outputPorts: TimerNodeOutputPorts;

    mesh: Mesh;

    startDate: number;
    now: number;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            outputPorts: {
                milliseconds: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'MS'
                    }
                }
            },
            data: {
                name: 'Timer'
            }
        } as NodeProps);

        super(context, props);

        this.updateTimer = this.updateTimer.bind(this);
        this.startDate = Date.now();

        requestAnimationFrame(this.updateTimer);
    }

    updateTimer() {
        requestAnimationFrame(this.updateTimer);

        this.now = Date.now();

        this.outputPorts.milliseconds.value = this.now - this.startDate;
    }
}
