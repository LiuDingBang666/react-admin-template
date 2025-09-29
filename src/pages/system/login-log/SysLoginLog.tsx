/**
 * @name: 名称
 * @description: TODO 系统登录日志
 * @author: mayn
 * @date: 2025/9/23 14:12
 */
import BaseTable from "@/components/table/BaseTable.tsx";
import {addLoginLog, deleteLoginLog, getLoginLogById, pageLoginLog, updateLoginLog} from "@/api/system/login-log.ts";
import columns from "@/pages/system/login-log/columns.tsx";
import searchs from "@/pages/system/login-log/search.tsx";


export default function SysLoginLog() {
   return (
      <BaseTable searchs={searchs} columns={columns} name="登录日志" addApi={addLoginLog} deleteApi={deleteLoginLog} api={pageLoginLog} detailApi={getLoginLogById} updateApi={updateLoginLog}></BaseTable>
   )
}
