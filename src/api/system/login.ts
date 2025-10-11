/**
 * @name: 名称
 * @description: TODO 登录api
 * @author: mayn
 * @date: 2025/10/11 10:24
 */
import { get, post } from '@/utils/http-request.ts';
import type { BaseResult, RequestParams } from '@/entity/common.ts';
import type { LoginUserInfo } from '@/entity/system/login-user-info.ts';

const API_PREFIX = '/auth';

/**
 * 获取登录验证码
 */
export function getKaptcha() {
  return get<BaseResult<Blob>>(
    API_PREFIX + '/getKaptcha',
    {},
    { responseType: 'blob', returnFullResponse: true },
  );
}

/**
 * 获取RSA公钥
 */
export function getRsaPublicKey() {
  return get<BaseResult<string>>(API_PREFIX + '/getRsaPublicKey');
}

/**
 * 密码登录
 * @param data
 */
export function passwordLogin(data: RequestParams) {
  return post<BaseResult<LoginUserInfo>>(API_PREFIX + '/passwordLogin', data);
}

/**
 * 退出登录
 */
export function logout() {
  return post<BaseResult<boolean>>(API_PREFIX + '/logout');
}
