import * as React from 'react';
import Draggable from 'react-draggable';
import { Node as _Node } from 'wire-core';

import { NodeHandle } from './NodeHandle';
import { NodeContent } from './NodeContent';

export interface INodeProps {
    node: _Node;
}

export const Node = ({ node }: INodeProps) => {
    return (
        <Draggable handle=".handle">
            <div className="node">
                <NodeHandle name={node.data.name} />
                <NodeContent node={node} />
            </div>
        </Draggable>
    );
};
