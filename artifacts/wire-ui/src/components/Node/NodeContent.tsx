import * as React from 'react';
import { Node as _Node, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort } from 'wire-core';
import { observer } from 'mobx-react-lite';
import { get, set, autorun } from 'mobx';
import classnames from 'classnames';
import * as _ from 'lodash';

export interface INodeContentProps {
    node: _Node;
    onPortMouseDown?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
    onPortMouseUp?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
}

export const NodeContent = observer(({ node, onPortMouseDown, onPortMouseUp }: INodeContentProps) => {
    return (
        <div className="node-content">
            <NodePorts
                ports={node.inputPorts}
                node={node}
                onPortMouseDown={onPortMouseDown}
                onPortMouseUp={onPortMouseUp}
            />
            <NodePorts
                ports={node.outputPorts}
                node={node}
                onPortMouseDown={onPortMouseDown}
                onPortMouseUp={onPortMouseUp}
                outputs
            />
        </div>
    );
});

export interface INodePortsProps {
    ports: NodeInputPorts | NodeOutputPorts;
    node: _Node;
    outputs?: boolean;
    onPortMouseDown?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
    onPortMouseUp?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
}

export const NodePorts = observer(({ ports, node, outputs, onPortMouseDown, onPortMouseUp }: INodePortsProps) => {
    const [portsToRender, setPortsToRender] = React.useState([]);

    React.useEffect(() => {
        return autorun(() => {
            if (get(node.data, 'collapsed')) {
                const portsWithConnections = Object.values(ports).filter(p => p.isConnected);
                setPortsToRender(portsWithConnections);
            } else {
                setPortsToRender(Object.values(ports));
            }
        });
    }, []);

    return (
        <div className={classnames(['ports', outputs && 'outputs'])}>
            {portsToRender.map(p => (
                <NodePort key={p.id} port={p} onPortMouseDown={onPortMouseDown} onPortMouseUp={onPortMouseUp} />
            ))}
        </div>
    );
});

export interface INodePortProps {
    port: InputPort<any> | OutputPort<any>;
    onPortMouseDown?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
    onPortMouseUp?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
}

export const NodePort = observer(({ port, onPortMouseDown, onPortMouseUp }: INodePortProps) => {
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
        <div
            ref={ref}
            className={classnames(['port', port.isConnected && 'connected'])}
            onMouseDown={e => onPortMouseDown(e, port)}
            onMouseUp={e => onPortMouseUp(e, port)}
        >
            {port instanceof InputPort && <div className="connector" />}
            <span className="name">{port.data.name}</span>
            {port instanceof OutputPort && <div className="connector" />}
        </div>
    );
});
