import { Node, NodeProps, NodeInputPorts, NodeOutputPorts } from '../../Node';
import { InputPort, OutputPort } from '../../Port';
import { Context } from '../../Context';
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
