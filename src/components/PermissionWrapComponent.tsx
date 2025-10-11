import type { ReactElement } from 'react';
import { useUserStore } from '@/store/user-store.ts';

/**
 * PermissionWrapComponent.tsx
 * @param props - 组件属性
 * @constructor
 */
export function PermissionWrapComponent(props: {
  permission: string;
  children: ReactElement;
}): ReactElement {
  const userInfo = useUserStore().data;
  const values = userInfo.permissions ? userInfo.permissions.map((val) => val.name) : [];
  const isPermission = userInfo.type === 2 || values.includes(props.permission);
  return <>{isPermission && props.children}</>;
}
