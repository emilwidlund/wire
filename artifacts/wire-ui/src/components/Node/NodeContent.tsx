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
            <NodePorts ports={node.outputPorts} outputs />
        </div>
    );
});

export interface INodePortsProps {
    ports: NodeInputPorts | NodeOutputPorts;
    outputs?: boolean;
}

export const NodePorts = observer(({ ports, outputs }: INodePortsProps) => {
    return (
        <div style={{ ...styles.ports, ...{ alignItems: outputs ? 'flex-end' : null } }}>
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
        <div style={styles.port}>
            <span>
                {port.data.name}: {port.value}
            </span>
        </div>
    );
});

const styles: { [key: string]: React.CSSProperties } = {
    content: {
        position: 'relative',
        display: 'flex',
        padding: 10
    },
    ports: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    port: {
        display: 'flex',
        lineHeight: 1.6
    }
};
