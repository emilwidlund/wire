import * as React from 'react';
import { Node as _Node, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';
import { observer } from 'mobx-react-lite';
import { get, set } from 'mobx';

export interface INodeContentProps {
    node: _Node;
}

export const NodeContent = observer(({ node }: INodeContentProps) => {
    return (
        <div style={styles.content()}>
            <NodePorts ports={node.inputPorts} collapsed={get(node.data, 'collapsed')} />
            <NodePorts ports={node.outputPorts} collapsed={get(node.data, 'collapsed')} outputs />
        </div>
    );
});

export interface INodePortsProps {
    ports: NodeInputPorts | NodeOutputPorts;
    collapsed: boolean;
    outputs?: boolean;
}

export const NodePorts = observer(({ ports, collapsed, outputs }: INodePortsProps) => {
    const [portsToRender, setPortsToRender] = React.useState([]);

    React.useEffect(() => {
        if (collapsed) {
            const portsWithConnections = Object.values(ports).filter(p => p.isConnected);
            setPortsToRender(portsWithConnections);
        } else {
            setPortsToRender(Object.values(ports));
        }
    }, [ports, collapsed]);

    return (
        <div style={styles.ports(outputs)}>
            {portsToRender.map(p => (
                <NodePort key={p.id} port={p} />
            ))}
        </div>
    );
});

export interface INodePortProps {
    port: InputPort<any> | OutputPort<any>;
}

export const NodePort = observer(({ port }: INodePortProps) => {
    const ref = React.useRef<HTMLDivElement>();

    React.useEffect(() => {
        const nodePosition = get(port.node.data, 'position') || { x: 0, y: 0 };

        const position = {
            x: nodePosition.x + ref.current.offsetLeft,
            y: nodePosition.y + ref.current.offsetTop
        };

        if (port instanceof OutputPort) {
            position.x += ref.current.clientWidth;
        }

        set(port.data, 'position', position);
    }, [
        get(port.node.data, 'position'),
        get(port.node.data, 'collapsed'),

        // Reacts when connections are removed & node is collapsed
        port instanceof InputPort
            ? Object.values(port.node.inputPorts).filter(ip => ip.isConnected)
            : Object.values(port.node.outputPorts).filter(op => op.isConnected)
    ]);

    return (
        <div ref={ref} style={styles.port()}>
            {port instanceof InputPort && <div style={styles.portConnector(port)} />}
            <span style={styles.portName(port)}>
                {port.data.name}: {port.value}
            </span>
            {port instanceof OutputPort && <div style={styles.portConnector(port)} />}
        </div>
    );
});

const styles: {
    content: () => React.CSSProperties;
    ports: (outputs: boolean) => React.CSSProperties;
    port: () => React.CSSProperties;
    portConnector: (port: InputPort<any> | OutputPort<any>) => React.CSSProperties;
    portName: (port: InputPort<any> | OutputPort<any>) => React.CSSProperties;
} = {
    content: () => ({
        display: 'flex',
        padding: 10
    }),
    ports: (outputs: boolean) => ({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: outputs ? 'flex-end' : null
    }),
    port: () => ({
        display: 'flex',
        alignItems: 'center'
    }),
    portConnector: (port: InputPort<any> | OutputPort<any>) => ({
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: port.isConnected ? '#0044ff' : 'rgba(255, 255, 255, .2)'
    }),
    portName: (port: InputPort<any> | OutputPort<any>) => ({
        lineHeight: 1.6,
        marginLeft: 8,
        marginRight: 8,
        opacity: port.isConnected ? 1 : 0.5
    })
};
