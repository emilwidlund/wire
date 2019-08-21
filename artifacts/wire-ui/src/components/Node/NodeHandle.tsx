import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Close, UnfoldLess } from '@material-ui/icons';
import { Node as _Node } from 'wire-core';
import { get, set } from 'mobx';

export interface INodeHandleProps {
    node: _Node;
}

export const NodeHandle = observer(({ node }: INodeHandleProps) => {
    return (
        <div className="handle" style={styles.container()}>
            <div style={styles.name()}>
                <span>{get(node.data, 'name')}</span>
            </div>
            <div style={styles.actions()}>
                <NodeAction
                    children={
                        <UnfoldLess
                            style={{
                                marginRight: 4,
                                color: get(node.data, 'collapsed') ? '#fff' : 'rgba(255, 255, 255, .33)'
                            }}
                            fontSize="inherit"
                        />
                    }
                    onClick={() => set(node.data, 'collapsed', !get(node.data, 'collapsed'))}
                />
                <NodeAction children={<Close fontSize="inherit" />} onClick={() => node.destroy()} />
            </div>
        </div>
    );
});

export interface INodeActionsProps {
    onClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

export const NodeAction = observer(({ children, onClick }: React.PropsWithChildren<INodeActionsProps>) => {
    return <div onClick={onClick}>{children}</div>;
});

const styles: {
    container: () => React.CSSProperties;
    name: () => React.CSSProperties;
    actions: () => React.CSSProperties;
} = {
    container: () => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderBottom: '2px solid #0044ff'
    }),
    name: () => ({
        flexGrow: 1
    }),
    actions: () => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 14
    })
};
