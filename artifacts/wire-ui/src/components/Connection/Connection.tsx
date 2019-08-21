import * as React from 'react';
import { get } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Connection as _Connection } from 'wire-core';

export interface Position {
    x: number;
    y: number;
}

export interface IConnectionProps {
    fromPosition?: Position;
    toPosition?: Position;
    connection?: _Connection;
    onClick?(): void;
}

export const Connection = observer(({ fromPosition, toPosition, connection, onClick }: IConnectionProps) => {
    const [pathString, setPathString] = React.useState('');
    const [sourcePos, setSourcePos] = React.useState({ x: 0, y: 0 });
    const [targetPos, setTargetPos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        if (fromPosition && toPosition) {
            setSourcePos({
                x: fromPosition.x + 14,
                y: toPosition.y + 9
            });
            setTargetPos(toPosition);

            setPathString(bezierCurve(sourcePos, targetPos));
        } else if (connection) {
            const outputPortPosition = get(connection.fromPort.data, 'position');
            const inputPortPosition = get(connection.toPort.data, 'position');

            setSourcePos({
                x: outputPortPosition.x + 10,
                y: outputPortPosition.y
            });
            setTargetPos({
                x: inputPortPosition.x - 10,
                y: inputPortPosition.y
            });

            setPathString(bezierCurve(sourcePos, targetPos));
        }
    });

    return (
        <g>
            <path
                className="connector"
                d={pathString}
                fill="none"
                strokeWidth="2"
                stroke={!connection ? '#fff' : '#444'}
                onClick={onClick}
            />
            <path
                className="port"
                d={`M${sourcePos.x},${sourcePos.y},${sourcePos.x + 2},${sourcePos.y}`}
                fill="none"
                strokeWidth="10"
                stroke="#0044ff"
            />
            <path
                className="port"
                d={`M${targetPos.x - 2},${targetPos.y},${targetPos.x},${targetPos.y}`}
                fill="none"
                strokeWidth="10"
                stroke="#0044ff"
            />
        </g>
    );
});

const bezierCurve = (start: Position, end: Position) => {
    let x1 = start.x;
    let y1 = start.y;
    let x4 = end.x;
    let y4 = end.y;
    let min_diff = 42;
    let diffx = Math.max(min_diff, x4 - x1);
    let diffy = Math.max(min_diff, y4 - y1);

    let x2 = x1 + diffx * 0.5;
    let y2 = y1;
    let x3 = x4 - diffx * 0.5;
    let y3 = y4;

    return `M${x1.toFixed(3)},${y1.toFixed(3)} C${x2},${y2} ${x3},${y3}  ${x4.toFixed(3)},${y4.toFixed(3)}`;
};
