import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Close, UnfoldLess } from '@material-ui/icons';
import { Node as _Node } from 'wire-core';
import { get, set } from 'mobx';
import classnames from 'classnames';

export interface INodeHandleProps {
    node: _Node;
    selected: boolean;
}

export const NodeHandle = observer(({ node, selected }: INodeHandleProps) => {
    return (
        <div className={classnames(['node-handle', selected && 'selected'])}>
            <div className="name">
                <span>{get(node.data, 'name')}</span>
            </div>
            <div className="actions">
                <NodeAction
                    children={
                        <UnfoldLess
                            style={{
                                marginRight: 6,
                                color: get(node.data, 'collapsed') ? '#fff' : 'rgba(255, 255, 255, .4)'
                            }}
                            fontSize="inherit"
                        />
                    }
                    onClick={() => set(node.data, 'collapsed', !node.data.collapsed)}
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
