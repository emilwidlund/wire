import * as React from 'react';
import Draggable from 'react-draggable';
import { Node as _Node } from 'wire-core';
import { observer } from 'mobx-react-lite';

import { NodeHandle } from './NodeHandle';
import { NodeContent } from './NodeContent';

export interface INodeProps {
    node: _Node;
}

export const Node = observer(({ node }: INodeProps) => {
    return (
        <Draggable handle=".handle">
            <div className="node">
                <NodeHandle name={node.data.name} />
                <NodeContent node={node} />
            </div>
        </Draggable>
    );
});
