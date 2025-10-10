/**
 * @name: 名称
 * @description: TODO 登录日志API
 * @author: mayn
 * @date: 2025/9/28 15:09
 */
import {del, upload, get, post} from "@/utils/http-request.ts";
import type {LoginLog} from "@/entity/system/login-log.ts";
import type {BasePage, BaseResult, RequestParams} from "@/entity/common.ts";

// 接口前缀
const API_PREFIX = '/sysLoginLog'

/**
 * 新增
 * @param data
 */
export function addLoginLog(data: RequestParams): Promise<LoginLog> {
  return post(API_PREFIX, data)
}

/**
 * 批量删除
 * @param data
 */
export function deleteLoginLog(data: Array<string>): Promise<boolean> {
    return del(API_PREFIX + '/batchDelete/' + data.join(','))
}

/**
 * 删除
 * @param id
 */
export function deleteLoginLogById(id: string): Promise<boolean> {
    return del(API_PREFIX + '/' + id)
}

/**
 * 修改
 * @param data
 */
export function updateLoginLog(data: RequestParams): Promise<LoginLog> {
    return post(API_PREFIX + '/update', data)
}

/**
 * 分页查询
 * @param data
 */
export function pageLoginLog(data: RequestParams): Promise<BaseResult<BasePage<LoginLog>>> {
  return post(API_PREFIX + '/page', data)
}

/**
 * 查询所有
 */
export function getListLoginLog(data: RequestParams): Promise<Array<LoginLog>> {
    return post(API_PREFIX + '/query/list',  data)
}

/**
 * 查询 by id
 * @param id
 */
export function getLoginLogById(id: string): Promise<LoginLog> {
    return get(API_PREFIX + '/' + id)
}

/**
 * 导出
 * @param data 请求参数
 */
export function exportLoginLog(data: RequestParams): Promise<Blob> {
    return post(API_PREFIX + '/export', data, { responseType: 'blob' })
}


/**
 * 下载导入模板
 */
export function downLoginLogTemplate(): Promise<Blob> {
    return get(API_PREFIX + '/template', {}, { responseType: 'blob' })
}

/**
 * 导入
 * @param data 请求参数
 */
export function importLoginLog(data: FormData): Promise<BaseResult<boolean>> {
    return upload(API_PREFIX + '/import', data)
}


