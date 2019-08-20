import * as React from 'react';
import { observer } from 'mobx-react-lite';

export interface INodeHandleProps {
    name: string;
}

export const NodeHandle = observer(({ name }: INodeHandleProps) => {
    return (
        <div className="handle">
            <div>
                <span>{name}</span>
            </div>
        </div>
    );
});
