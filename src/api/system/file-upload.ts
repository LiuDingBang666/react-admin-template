/**
 * @name: 名称
 * @description: TODO 文件上传API
 * @author: mayn
 * @date: 2025/9/28 15:09
 */
import { del, upload, get, post } from '@/utils/http-request.ts';
import type { BasePage, BaseResult, RequestParams } from '@/entity/common.ts';
import type { FileUpload } from '@/entity/system/file-upload.ts';

// 接口前缀
const API_PREFIX = '/sysFileUploads/';

/**
 * 新增
 * @param data
 */
export function addFileUpload(data: RequestParams): Promise<FileUpload> {
  return post(API_PREFIX, data);
}

/**
 * 批量删除
 * @param data
 */
export function deleteFileUpload(data: Array<string>): Promise<boolean> {
  return del(API_PREFIX + 'batchDelete/' + data.join(','));
}

/**
 * 删除
 * @param id
 */
export function deleteFileUploadById(id: string): Promise<boolean> {
  return del(API_PREFIX + id);
}

/**
 * 修改
 * @param data
 */
export function updateFileUpload(data: RequestParams): Promise<FileUpload> {
  return post(API_PREFIX + 'update', data);
}

/**
 * 分页查询
 * @param data
 */
export function pageFileUpload(data: RequestParams): Promise<BaseResult<BasePage<FileUpload>>> {
  return post(API_PREFIX + 'page', data);
}

/**
 * 查询所有
 */
export function getListFileUpload(data: RequestParams): Promise<Array<FileUpload>> {
  return post(API_PREFIX + 'query/list', data);
}

/**
 * 查询根据id
 * @param id
 */
export function getFileUploadById(id: string): Promise<FileUpload> {
  return get(API_PREFIX + id);
}

/**
 * 导出
 * @param data 请求参数
 */
export function exportFileUpload(data: RequestParams): Promise<Blob> {
  return post(API_PREFIX + 'export', data, { responseType: 'blob' });
}

/**
 * 下载导入模板
 */
export function downFileUploadTemplate(): Promise<Blob> {
  return get(API_PREFIX + 'template', {}, { responseType: 'blob' });
}

/**
 * 导入
 * @param data 请求参数
 */
export function importFileUpload(data: FormData): Promise<BaseResult<boolean>> {
  return upload(API_PREFIX + 'import', data);
}
