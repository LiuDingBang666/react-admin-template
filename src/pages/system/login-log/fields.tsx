import type { BaseFormItemProps } from '@/components/form/BaseFormItem.tsx';
import type { LoginLog } from '@/entity/system/login-log.ts';

const fields: Array<BaseFormItemProps<LoginLog>> = [
  {
    name: 'username',
    label: '用户名',
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
    name: 'loginTime',
    label: '登录时间',
    type: 'DatePicker',
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
  {
    name: 'file',
    label: '登录日志',
    type: 'Upload',
    placeholder: '请上传登录日志',
  },
];

export default fields;
