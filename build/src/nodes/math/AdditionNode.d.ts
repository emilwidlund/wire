import { Node, InputPort, OutputPort, NodeInputPorts, NodeOutputPorts, Context, NodeProps } from '../../core';
export interface AdditionNodeInputPorts extends NodeInputPorts {
    a: InputPort<number>;
    b: InputPort<number>;
}
export interface AdditionNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}
export declare class AdditionNode extends Node {
    inputPorts: AdditionNodeInputPorts;
    outputPorts: AdditionNodeOutputPorts;
    constructor(context: Context, props?: NodeProps);
    compute(): void;
}
