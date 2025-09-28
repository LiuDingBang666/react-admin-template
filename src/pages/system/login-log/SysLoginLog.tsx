/**
 * @name: 名称
 * @description: TODO 系统登录日志
 * @author: mayn
 * @date: 2025/9/23 14:12
 */
import BaseTable from "@/components/table/BaseTable.tsx";
import {getLoginLogById, pageLoginLog, updateLoginLog} from "@/api/system/login-log.ts";
import columns from "@/pages/system/login-log/columns.tsx";
export default function SysLoginLog() {
   return (
      <BaseTable searchs={[]} columns={columns} name="登录日志" api={pageLoginLog} detailApi={getLoginLogById} updateApi={updateLoginLog}></BaseTable>
   )
}
