import type { BaseEntity } from '@/entity/common.ts';

/**
 * 权限定义
 */
export interface Permission extends BaseEntity {
  /** 菜单/资源 ID（后端字段名） */
  fkMenuId: string;
  /** 权限名 */
  name: string;
  /** 权限描述 */
  description: string;
  /** 权限含义名称（后端拼写） */
  meanName: string;
}
