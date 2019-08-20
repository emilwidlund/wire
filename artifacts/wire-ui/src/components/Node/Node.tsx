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
            <div style={styles.container}>
                <NodeHandle name={node.data.name} />
                <NodeContent node={node} />
            </div>
        </Draggable>
    );
});

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: 220,
        backgroundColor: '#111',
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: 'Inter',
        fontSize: 12,
        color: '#fff',
        userSelect: 'none'
    }
};
