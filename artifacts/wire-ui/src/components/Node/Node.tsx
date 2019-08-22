import * as React from 'react';
import Draggable from 'react-draggable';
import { Node as _Node } from 'wire-core';
import { observer } from 'mobx-react-lite';
import { set } from 'mobx';

import { NodeHandle } from './NodeHandle';
import { NodeWindow } from './NodeWindow';
import { NodeContent } from './NodeContent';

export interface INodeProps {
    node: _Node;
    selected?: boolean;
}

export const Node = observer(({ node, selected, children }: React.PropsWithChildren<INodeProps>) => {
    return (
        <Draggable
            handle=".handle"
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
            <div style={styles.container()}>
                <NodeHandle node={node} selected={selected} />
                <NodeWindow children={children} />
                <NodeContent node={node} />
            </div>
        </Draggable>
    );
});

const styles: {
    container: () => React.CSSProperties;
} = {
    container: () => ({
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: 220,
        backgroundColor: '#000',
        borderRadius: 10,
        border: '1px solid rgba(255, 255, 255, .1)',
        overflow: 'hidden',
        fontSize: 12,
        color: '#fff',
        userSelect: 'none'
    })
};
