import type { LoginLog } from '@/entity/system/login-log.ts';
import type { FormDetailConfigProps } from '@/components/form/FormDetail.tsx';
import type { ReactElement } from 'react';

/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/28 15:57
 */

const details: FormDetailConfigProps<LoginLog>[] = [
  {
    title: '',
    items: [
      {
        title: '用户名',
        column: 'username',
      },
      {
        title: '登录IP',
        column: 'ip',
      },
      {
        title: '登录地点',
        column: 'location',
      },
      {
        title: '登录状态',
        column: 'status',
        render: (record) => {
          return (record.status === 1 ? '登录成功' : '登录失败') as unknown as ReactElement;
        },
      },
      {
        title: '登录时间',
        column: 'createTime',
      },
      {
        title: '浏览器类型',
        column: 'browser',
      },
      {
        title: '操作系统',
        column: 'os',
      },
      {
        title: '提示信息',
        column: 'msg',
      },
    ],
  },
];

export default details;
