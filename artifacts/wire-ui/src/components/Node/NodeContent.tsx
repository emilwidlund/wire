import * as React from 'react';
import { Node as _Node, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';
import { observer } from 'mobx-react-lite';

export interface INodeContentProps {
    node: _Node;
}

export const NodeContent = observer(({ node }: INodeContentProps) => {
    return (
        <div style={styles.content}>
            <NodePorts ports={node.inputPorts} />
            <NodePorts ports={node.outputPorts} />
        </div>
    );
});

export interface INodePortsProps {
    ports: NodeInputPorts | NodeOutputPorts;
}

export const NodePorts = observer(({ ports }: INodePortsProps) => {
    return (
        <div className="ports">
            {Object.values(ports).map(p => (
                <NodePort port={p} />
            ))}
        </div>
    );
});

export interface INodePortProps {
    port: InputPort<any> | OutputPort<any>;
}

export const NodePort = observer(({ port }: INodePortProps) => {
    return (
        <div>
            <span>{port.data.name}:</span>
            <span>{port.value}</span>
        </div>
    );
});

const styles: { [key: string]: React.CSSProperties } = {
    content: {
        display: 'flex'
    }
};
