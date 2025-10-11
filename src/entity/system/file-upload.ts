import type { BaseEntity } from '@/entity/common.ts';

/**
 * @name: 名称
 * @description: TODO 文件上传实体
 * @author: mayn
 * @date: 2number25/9/28 15:number8
 */
export interface FileUpload extends BaseEntity {
  // 文件名称
  fileName: string;
  // 文件路径
  filePath: string;
  // 文件大小
  fileSize: number;
  // 文件类型
  fileType: string;
}
