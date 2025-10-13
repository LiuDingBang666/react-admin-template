import type { BaseFormItemProps } from '@/components/form/BaseFormItem.tsx';
import type { LoginLog } from '@/entity/system/login-log.ts';

const searchs: Array<BaseFormItemProps<LoginLog>> = [
  {
    name: 'username',
    label: '登录账号',
    type: 'Input',
  },
  {
    name: 'ip',
    label: '登录IP',
    type: 'Input',
  },
  {
    name: 'location',
    label: '登录地点',
    type: 'Input',
  },
  {
    name: 'loginTimes',
    label: '登录时间',
    type: 'DateRangePicker',
    props: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    name: 'status',
    label: '登录状态',
    type: 'Select',
    props: {
      options: [
        {
          label: '登录成功',
          value: 1,
        },
        {
          label: '登录失败',
          value: 0,
        },
      ],
    },
  },
];

export default searchs;
