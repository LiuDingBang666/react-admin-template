/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/10/13 09:27
 */

import type { BaseEntity } from '@/entity/common.ts';

/**
 * 角色定义
 */
export interface Role extends BaseEntity {
  /** 角色名称 */
  name: string;
  /** 角色描述 */
  description: string;
  /** 角色-权限关联列表（如需直接使用权限列表，也可扩展为 Permission[]） */
  permissions: RolePermissionRef[];
}

/**
 * 角色-权限 关联（通常是中间表）
 */
export interface RolePermissionRef extends BaseEntity {
  /** 角色 ID */
  roleId: string;
  /** 权限 ID */
  permissionId: string;
}
