import * as React from 'react';
import { Node as _Node, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';

export interface INodeContentProps {
    node: _Node;
}

export const NodeContent = ({ node }: INodeContentProps) => {
    return (
        <div className="content">
            <NodePorts ports={node.inputPorts} />
            <NodePorts ports={node.outputPorts} />
        </div>
    );
};

export interface INodePortsProps {
    ports: NodeInputPorts | NodeOutputPorts;
}

export const NodePorts = ({ ports }: INodePortsProps) => {
    return (
        <div className="ports">
            {Object.values(ports).map(p => (
                <NodePort port={p} />
            ))}
        </div>
    );
};

export interface INodePortProps {
    port: InputPort<any> | OutputPort<any>;
}

export const NodePort = ({ port }: INodePortProps) => {
    return (
        <div>
            <span>{port.data.name}</span>
            <span>{port.value}</span>
        </div>
    );
};
