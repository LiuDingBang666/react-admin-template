import type {BaseEntity} from "@/entity/common.ts";

/**
 * @name: 名称
 * @description: TODO 登录日志
 * @author: mayn
 * @date: 2number25/9/28 15:number8
 */
export interface LoginLog extends BaseEntity{
    "userId": number
    "username": string
    "ip": string
    "location": string
    "browser": string
    "os": string
    "status": number
    "msg": string
    "loginTime": string
}
