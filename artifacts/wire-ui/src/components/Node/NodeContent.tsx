import * as React from 'react';
import { Node as _Node, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';
import { observer } from 'mobx-react-lite';
import { get, set } from 'mobx';
import classnames from 'classnames';

export interface INodeContentProps {
    node: _Node;
}

export const NodeContent = observer(({ node }: INodeContentProps) => {
    return (
        <div className="node-content">
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
        <div className={classnames(['ports', outputs && 'outputs'])}>
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
        <div ref={ref} className={classnames(['port', port.isConnected && 'connected'])}>
            {port instanceof InputPort && <div className="connector" />}
            <span className="name">
                {port.data.name}: {port.value}
            </span>
            {port instanceof OutputPort && <div className="connector" />}
        </div>
    );
});
