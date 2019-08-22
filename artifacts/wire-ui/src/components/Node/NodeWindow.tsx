import * as React from 'react';

export const NodeWindow = (props: React.PropsWithChildren<{}>) => {
    return <div className="node-window">{props.children}</div>;
};
