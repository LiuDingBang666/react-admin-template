/**
 * @name: 名称
 * @description: TODO 系统登录日志
 * @author: mayn
 * @date: 2025/9/23 14:12
 */
import BaseTable from "@/components/table/BaseTable.tsx";
import {pageLoginLog} from "@/api/system/login-log.ts";


export default function SysLoginLog() {
   return (
      <BaseTable searchs={[]} columns={[]} name="登录日志" api={pageLoginLog}></BaseTable>
   )
}
