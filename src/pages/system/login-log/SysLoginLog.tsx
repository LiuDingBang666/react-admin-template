/**
 * @name: 名称
 * @description: TODO 系统登录日志
 * @author: mayn
 * @date: 2025/9/23 14:12
 */
import BaseTable from '@/components/table/BaseTable.tsx';
import { getLoginLogById, pageLoginLog, updateLoginLog } from '@/api/system/login-log.ts';
import columns from '@/pages/system/login-log/columns.tsx';
import searchs from '@/pages/system/login-log/search.tsx';
import fields from '@/pages/system/login-log/fields.tsx';
import details from '@/pages/system/login-log/detail.tsx';
import dayjs from 'dayjs';

export default function SysLoginLog() {
  function handlerOnGetDetailAfter(data) {
    data.loginTime = dayjs(data.loginTime);
  }

  function handlerOnSearchBefore(data) {
    if (data.loginTimes && data.loginTimes.length === 2 && data.loginTimes[0].format) {
      data.createdAtStart = data.loginTimes[0].format('YYYY-MM-DD HH:mm:ss');
      data.createdAtStop = data.loginTimes[1].format('YYYY-MM-DD HH:mm:ss');
    } else {
      data.createdAtStart = undefined;
      data.createdAtStop = undefined;
    }
  }

  return (
    <BaseTable
      name="登录日志"
      searchs={searchs}
      detail={details}
      formItems={fields}
      columns={columns}
      updateApi={updateLoginLog}
      api={pageLoginLog}
      detailApi={getLoginLogById}
      onGetDetailAfter={handlerOnGetDetailAfter}
      onSearchBefore={handlerOnSearchBefore}
    ></BaseTable>
  );
}
