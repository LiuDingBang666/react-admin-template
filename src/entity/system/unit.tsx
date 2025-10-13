/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/10/13 09:28
 */
import type { BaseEntity } from '@/entity/common.ts';

/**
 * 单位定义
 */
export interface Unit extends BaseEntity {
  /** 单位名称 */
  name: string;
  /** 上级单位 ID */
  parentId: string;
  /** 描述 */
  description: string;
}
