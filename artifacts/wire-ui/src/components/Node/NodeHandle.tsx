import * as React from 'react';
import { observer } from 'mobx-react-lite';

export interface INodeHandleProps {
    name: string;
}

export const NodeHandle = observer(({ name }: INodeHandleProps) => {
    return (
        <div className="handle" style={styles.container()}>
            <div>
                <span>{name}</span>
            </div>
        </div>
    );
});

const styles: {
    container: () => React.CSSProperties;
} = {
    container: () => ({
        padding: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderBottom: '2px solid #0044ff'
    })
};
