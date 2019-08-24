import * as React from 'react';
import { Check, ArrowRightAlt } from '@material-ui/icons';
import * as classnames from 'classnames';
import useOnClickOutside from 'use-onclickoutside';

export interface IDropdownProps {
    style?: React.CSSProperties;
    onClickOutside?(e: MouseEvent): void;
}

export const Dropdown = ({ style, onClickOutside, children }: React.PropsWithChildren<IDropdownProps>) => {
    const ref = React.useRef<HTMLDivElement>();

    useOnClickOutside(ref, onClickOutside);

    return (
        <div ref={ref} style={style} className="dropdown">
            {children}
        </div>
    );
};

export interface IDropdownItemProps {
    text: string;
    toggleable?: boolean;
    shortcut?: string[];
    onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
    onClickOutside?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

export const DropdownItem = ({
    text,
    toggleable,
    shortcut,
    onClick,
    children
}: React.PropsWithChildren<IDropdownItemProps>) => {
    const [toggled, setToggled] = React.useState<boolean>(false);
    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);

    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            toggleable && setToggled(!toggled);
            onClick && onClick(e);
        },
        [toggled]
    );

    return (
        <div
            className={'dropdown-item'}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            onClick={handleClick}
        >
            <div className={classnames(['dropdown-item-content', toggled && 'toggled', isMouseOver && 'active'])}>
                <span>{text}</span>
                <div>
                    {shortcut && !toggleable && !children && <span>{shortcut.join(' + ')}</span>}
                    {toggled && !children && <Check fontSize="inherit" />}
                    {children && <ArrowRightAlt fontSize="inherit" />}
                </div>
            </div>
            {isMouseOver && children && (
                <div className="dropdown-item-children">
                    <Dropdown>{children}</Dropdown>
                </div>
            )}
        </div>
    );
};
