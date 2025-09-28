import type {ReactNode} from "react";

/**
 * PermissionWrapComponent.tsx
 * @param props - 组件属性
 * @constructor
 */
export function PermissionWrapComponent(props: {
    permission: string;
    children: ReactNode;
}): ReactNode {
    const isPermission = true;
    return (
        <>
            {isPermission && props.children}
        </>
    )
}