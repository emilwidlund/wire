import * as React from 'react';
import Draggable, { DraggableBounds } from 'react-draggable';
import useOnClickOutside from 'use-onclickoutside';
import { Node as _Node, InputPort, OutputPort } from 'wire-core';
import { observer } from 'mobx-react-lite';
import { set } from 'mobx';
import * as classnames from 'classnames';

import { NodeHandle } from './NodeHandle';
import { NodeWindow } from './NodeWindow';
import { NodeContent } from './NodeContent';

import './Node.scss';

export interface INodeProps {
    node: _Node;
    disabled?: boolean;
    selected?: boolean;
    bounds?: DraggableBounds;
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onMouseDown?(e: MouseEvent): void;
    onPortMouseDown?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
    onPortMouseUp?(e: React.MouseEvent<HTMLDivElement, MouseEvent>, port: InputPort<any> | OutputPort<any>): void;
    onClickOutside?(e: MouseEvent): void;
}

export const Node = observer(
    ({
        node,
        disabled,
        selected,
        bounds,
        onClick,
        onMouseDown,
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
                bounds={bounds}
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
                onMouseDown={onMouseDown}
                disabled={disabled}
            >
                <div ref={nodeRef} className={classnames(['node', selected && 'selected'])} onClick={onClick}>
                    <NodeHandle node={node} selected={selected} />
                    <NodeWindow children={children} />
                    <NodeContent node={node} onPortMouseDown={onPortMouseDown} onPortMouseUp={onPortMouseUp} />
                </div>
            </Draggable>
        );
    }
);
