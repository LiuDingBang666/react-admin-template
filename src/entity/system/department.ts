/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/10/13 09:29
 */
import type { BaseEntity } from '@/entity/common.ts';

/**
 * 部门定义
 */
export interface Department extends BaseEntity {
  /** 部门名称 */
  name: string;
  /** 上级部门 ID */
  parentId: string;
  /** 描述 */
  description: string;
}
