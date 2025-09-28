import type {ReactElement} from "react";

/**
 * PermissionWrapComponent.tsx
 * @param props - 组件属性
 * @constructor
 */
export function PermissionWrapComponent(props: {
    permission: string;
    children: ReactElement;
}): ReactElement {
    const isPermission = true;
    return (
        <>
            {isPermission && props.children}
        </>
    )
}