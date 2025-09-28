/**
 * @name: http-request
 * @description: axios 请求工具封装，支持 TS、拦截器、取消重复请求、文件上传下载
 * @author: mayn
 * @date: 2025/9/28 10:05
 */

import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { message } from 'antd';
import type { RequestParams } from "@/entity/common.ts";

/**
 * 统一的业务成功 code（可根据后端规范修改）
 */
const SUCCESS_CODES: Array<number | string> = [0, 200, 20000];

/**
 * 默认超时时间
 */
const DEFAULT_TIMEOUT = 15_000;


/**
 * 获取 token 优先顺序：自定义 resolver -> staticToken -> localStorage('token')
 */
function getToken(): string | undefined {
  return (localStorage.getItem('token')) as string | undefined;
}

/**
 * 取消重复请求：key 生成函数
 */
function buildReqKey(config: AxiosRequestConfig) {
  const {method, url, params, data} = config;
  // data 可能是 FormData，尝试安全序列化
  let dataStr = '';
  if (data instanceof FormData) {
    const obj: Record<string, unknown> = {};
    data.forEach((v, k) => { obj[k] = v; });
    dataStr = JSON.stringify(obj);
  } else if (typeof data === 'string') {
    dataStr = data;
  } else if (data) {
    try { dataStr = JSON.stringify(data); } catch { dataStr = String(data); }
  }
  let paramsStr = '';
  if (params) {
    try { paramsStr = JSON.stringify(params); } catch { paramsStr = String(params); }
  }
  return [method, url, paramsStr, dataStr].join('&');
}

const pendingMap = new Map<string, AbortController>();

/**
 * 添加请求
 * @param config
 */
function addPending(config: InternalAxiosRequestConfig) {
  const key = buildReqKey(config);
  if (pendingMap.has(key)) {
    // 已有同样请求 -> 取消前一个
    const controller = pendingMap.get(key)!;
    controller.abort();
    pendingMap.delete(key);
  }
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingMap.set(key, controller);
}

/**
 * 移除请求
 * @param config
 */
function removePending(config: AxiosRequestConfig) {
  const key = buildReqKey(config);
  if (pendingMap.has(key)) {
    pendingMap.delete(key);
  }
}

/**
 * 创建 axios 实例
 */
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: DEFAULT_TIMEOUT,
});

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    addPending(config);

    // 加 token
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = config.headers.Authorization || `Bearer ${token}`;
    }

    // 可加入自定义 headers
    // config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 响应拦截器
 */
instance.interceptors.response.use(
  (response) => {
    removePending(response.config);

    const cfg = response.config as RequestConfig;

    // 文件流直接返回
    if (response.request?.responseType === 'blob' || response.config.responseType === 'blob') {
      if (cfg.showSuccess) {
        const successMsg = typeof cfg.showSuccess === 'string' ? cfg.showSuccess : (cfg.successMessage || '下载成功');
        message.success(successMsg);
      }
      return response.data as unknown;
    }

    const respData: unknown = response.data;
    if (respData && SUCCESS_CODES.includes(respData.code)) {
      if (cfg.showSuccess) {
        const successMsg = typeof cfg.showSuccess === 'string'
          ? cfg.showSuccess
          : (cfg.successMessage || respData.message || '操作成功');
        message.success(successMsg);
      }
      return respData.data as unknown;
    }
    // 业务错误
    const errObj = {
      isBizError: true,
      code: respData?.code,
      message: respData?.message || '业务请求失败',
      raw: respData,
    };
    const showError = (response.config as RequestConfig).showError;
    if (showError !== false) {
      const errorMsg = typeof showError === 'string'
        ? showError
        : ((response.config as RequestConfig).errorMessage || errObj.message);
      message.error(errorMsg);
    }
    return Promise.reject(errObj);
  },
  (error: AxiosError) => {
    if (error.config) {
      removePending(error.config);
    }
    const cfg = (error.config || {}) as RequestConfig;
    // 取消请求
    if (axios.isCancel(error) || error.name === 'CanceledError') {
      if (cfg.showError) {
        const cancelMsg = typeof cfg.showError === 'string' ? cfg.showError : (cfg.errorMessage || '请求已取消');
        message.warning(cancelMsg);
      }
      return Promise.reject({isCanceled: true, message: '请求已取消'});
    }
    const status = error.response?.status;
    let msg = '网络异常';
    if (status) {
      if (status === 401) msg = '未授权或登录过期';
      else if (status === 403) msg = '无权限访问';
      else if (status === 404) msg = '资源不存在';
      else if (status >= 500) msg = '服务器内部错误';
    }
    const errObj = {
      isHttpError: true,
      status,
      message: msg,
      raw: error,
    };
    if (cfg.showError !== false) {
      const errorMsg = typeof cfg.showError === 'string'
        ? cfg.showError
        : (cfg.errorMessage || errObj.message);
      message.error(errorMsg);
    }
    return Promise.reject(errObj);
  },
);

/**
 * 自定义扩展配置：是否展示成功 / 失败提示
 */
export interface RequestFeedbackOptions {
  /** 展示成功提示。true 使用后端 message 或自定义 successMessage；也可直接传字符串 */
  showSuccess?: boolean | string;
  /** 展示失败提示。默认 true；可传字符串自定义文案 */
  showError?: boolean | string;
  /** 自定义成功消息优先级高于后端 message */
  successMessage?: string;
  /** 自定义失败消息优先级高于错误内置 message */
  errorMessage?: string;
}
export type RequestConfig<T = unknown> = AxiosRequestConfig<T> & RequestFeedbackOptions;

/**
 * 通用请求方法（保留 AxiosRequestConfig 能力）
 */
export function request<T = unknown>(config: RequestConfig): Promise<T> {
  return instance.request<unknown, T>(config);
}


//  快捷方法
export function get<T = unknown>(url: string, params?: RequestParams, config?: RequestConfig) {
  return request<T>({url, method: 'GET', params, ...(config || {})});
}
export function post<T = unknown>(url: string, data?: RequestParams, config?: RequestConfig) {
  return request<T>({url, method: 'POST', data, ...(config || {})});
}
export function put<T = unknown>(url: string, data?: RequestParams, config?: RequestConfig) {
  return request<T>({url, method: 'PUT', data, ...(config || {})});
}
export function patch<T = unknown>(url: string, data?: RequestParams, config?: RequestConfig) {
  return request<T>({url, method: 'PATCH', data, ...(config || {})});
}
export function del<T = unknown>(url: string, params?: RequestParams, config?: RequestConfig) {
  return request<T>({url, method: 'DELETE', params, ...(config || {})});
}

// 文件上传
export function upload<T = unknown>(url: string, formData: FormData, config?: RequestConfig) {
  return request<T>({
    url,
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data', ...(config?.headers || {}) },
    ...(config || {}),
  });
}

// 文件下载（返回 Blob）
export function download(url: string, params?: RequestParams, config?: RequestConfig) {
  return request<Blob>({
    url,
    method: 'GET',
    params,
    responseType: 'blob',
    ...(config || {}),
  });
}

// 导出 axios 实例供进一步自定义
export { instance as axiosInstance };

/** 使用示例：
 * await post('/user', data, { showSuccess: true }); // 成功后弹“操作成功”或后端 message
 * await del('/user/1', undefined, { showSuccess: '删除成功' }); // 自定义成功文案
 * await get('/list', { page:1 }, { showError: false }); // 静默失败
 * await post('/save', form, { showSuccess: '保存成功', showError: '保存失败' });
 * await download('/export', { id:1 }, { showSuccess: '导出成功' });
 */
