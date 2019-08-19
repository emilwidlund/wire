import * as React from 'react';

export interface INodeHandleProps {
    name: string;
}

export const NodeHandle = ({ name }: INodeHandleProps) => {
    return (
        <div className="handle">
            <div>
                <span>{name}</span>
            </div>
        </div>
    );
};
