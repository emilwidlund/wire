import * as React from 'react';
import Draggable from 'react-draggable';
import useOnClickOutside from 'use-onclickoutside';
import { Node as _Node, InputPort, OutputPort } from 'wire-core';
import { observer } from 'mobx-react-lite';
import { set } from 'mobx';

import { NodeHandle } from './NodeHandle';
import { NodeWindow } from './NodeWindow';
import { NodeContent } from './NodeContent';

import './Node.scss';

export interface INodeProps {
    node: _Node;
    selected?: boolean;
    onPortMouseDown?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
    onPortMouseUp?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
    onClickOutside?(e: MouseEvent): void;
}

export const Node = observer(
    ({
        node,
        selected,
        onPortMouseDown,
        onPortMouseUp,
        onClickOutside,
        children
    }: React.PropsWithChildren<INodeProps>) => {
        const nodeRef = React.useRef<HTMLDivElement>();

        useOnClickOutside(nodeRef, onClickOutside);

        return (
            <Draggable
                handle=".node-handle"
                defaultPosition={{
                    x: node.data.position ? node.data.position.x : 0,
                    y: node.data.position ? node.data.position.y : 0
                }}
                onDrag={(e, ui) => {
                    set(node.data, 'position', {
                        x: ui.x,
                        y: ui.y
                    });
                }}
            >
                <div ref={nodeRef} className="node">
                    <NodeHandle node={node} selected={selected} />
                    <NodeWindow children={children} />
                    <NodeContent node={node} onPortMouseDown={onPortMouseDown} onPortMouseUp={onPortMouseUp} />
                </div>
            </Draggable>
        );
    }
);
