import * as React from 'react';
import { observer } from 'mobx-react-lite';

export interface INodeHandleProps {
    name: string;
}

export const NodeHandle = observer(({ name }: INodeHandleProps) => {
    return (
        <div className="handle" style={styles.container}>
            <div>
                <span>{name}</span>
            </div>
        </div>
    );
});

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        paddingTop: 6,
        paddingBottom: 6,
        fontSize: 14,
        textAlign: 'center'
    }
};
