import * as _ from 'lodash';
import { Context, Node, NodeProps, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';
import { Clock } from 'three';

export interface TimerNodeInputPorts extends NodeInputPorts {
    paused: InputPort<boolean>;
}

export interface TimerNodeOutputPorts extends NodeOutputPorts {
    milliseconds: OutputPort<number>;
    seconds: OutputPort<number>;
}

/**
 * Adds input values and assigns the result to the "result" output port
 */
export class TimerNode extends Node {
    outputPorts: TimerNodeOutputPorts;

    animationFrameRequestId: number;
    clock: Clock;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                paused: {
                    defaultValue: false,
                    validate: (val: any) => _.isBoolean(val),
                    data: {
                        name: 'Paused'
                    }
                }
            },
            outputPorts: {
                milliseconds: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Milliseconds'
                    }
                },
                seconds: {
                    defaultValue: 0,
                    validate: (val: any) => _.isNumber(val),
                    data: {
                        name: 'Seconds'
                    }
                }
            },
            data: {
                name: 'Timer'
            }
        } as NodeProps);

        super(context, props);

        this.clock = new Clock(true);

        this.updateTimer = this.updateTimer.bind(this);

        this.animationFrameRequestId = requestAnimationFrame(this.updateTimer);
    }

    updateTimer() {
        this.animationFrameRequestId = requestAnimationFrame(this.updateTimer);

        this.outputPorts.milliseconds.value = this.clock.getElapsedTime() * 1000;

        if (Math.floor(this.clock.getElapsedTime()) !== this.outputPorts.seconds.value) {
            this.outputPorts.seconds.value = Math.floor(this.clock.getElapsedTime());
        }
    }

    compute() {
        if (!this.clock) return;

        if (this.inputPorts.paused.value && this.clock.running) {
            this.clock.stop();
        } else if (!this.inputPorts.paused.value && !this.clock.running) {
            this.clock.start();
        }

        if (this.inputPorts.paused.value) {
            cancelAnimationFrame(this.animationFrameRequestId);
        } else {
            this.animationFrameRequestId = requestAnimationFrame(this.updateTimer);
        }
    }
}
