import {
  type AutoCompleteProps,
  type CascaderProps,
  type CheckboxProps,
  type ColorPickerProps,
  type DatePickerProps,
  type FormItemProps,
  type InputNumberProps,
  type InputProps,
  type MentionsProps,
  type RadioProps,
  type RateProps,
  type SelectProps,
  type SliderSingleProps,
  type SwitchProps,
  type TimePickerProps,
  type TimeRangePickerProps,
  type TransferProps,
  type TreeSelectProps,
} from 'antd';
import {
  AutoComplete,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
} from 'antd';

import BaseUpload, { type BaseUploadProps } from '@/components/file-upload/BaseUpload.tsx';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import type { RangePickerTimeProps } from 'antd/es/time-picker';

dayjs.locale('zh-cn');
/**
 * @name: 名称
 * @description: TODO 表单项组件
 * @author: mayn
 * @date: 2025/9/23 17:32
 */
export interface BaseFormItemProps<T = any> {
  // 表单配置
  // 字段名称
  name: keyof T;
  // 标签
  label: string;
  // 表单项配置
  placeholder?: string;
  // 当前表单实例
  updateForm?: (params: any) => void;
  // 校验规则
  rules?: object[];
  // 表单组件类型
  type?:
    | 'AutoComplete'
    | 'Cascader'
    | 'Checkbox'
    | 'ColorPicker'
    | 'DatePicker'
    | 'DateRangePicker'
    | 'Input'
    | 'InputNumber'
    | 'Mentions'
    | 'Radio'
    | 'Rate'
    | 'Select'
    | 'Slider'
    | 'Switch'
    | 'TimePicker'
    | 'TimeRangePicker'
    | 'Transfer'
    | 'TreeSelect'
    | 'Upload';

  form?: FormItemProps;
  // 输入控件配置
  props?:
    | AutoCompleteProps
    | CascaderProps
    | CheckboxProps
    | ColorPickerProps
    | DatePickerProps
    | InputProps
    | InputNumberProps
    | MentionsProps
    | RadioProps
    | RateProps
    | SelectProps
    | SliderSingleProps
    | SwitchProps
    | TimePickerProps
    | TransferProps
    | TreeSelectProps
    | BaseUploadProps
    | RangePickerProps
    | RangePickerTimeProps<any>
    | TimeRangePickerProps;
}

// 用具名泛型定义组件，避免 React.FC 在泛型上的限制
const BaseFormItem = ({
  name,
  label,
  type,
  form,
  rules,
  props,
  updateForm,
  placeholder,
}: BaseFormItemProps) => {
  // 对于开关/复选框，Form.Item 需要 valuePropName='checked'
  const mergedFormItemProps: FormItemProps =
    type === 'Switch' || type === 'Checkbox'
      ? { valuePropName: 'checked', ...(form || {}) }
      : form || {};

  // 处理日期变化
  function handlerDateChange(value) {
    const config = props as any;
    if (config.format) {
      updateForm?.({
        [name as string]: Array.isArray(value)
          ? value.map((v) => v.format(config.format))
          : value?.format(config.format),
      });
    }
  }

  return (
    <>
      <Form.Item label={label} name={name as string} rules={rules} {...mergedFormItemProps}>
        {type === 'Input' && (
          <Input
            allowClear
            placeholder={placeholder ?? '请输入' + label}
            {...(props as InputProps)}
          />
        )}
        {type === 'InputNumber' && (
          <InputNumber
            placeholder={placeholder ?? '请输入' + label}
            {...(props as InputNumberProps)}
          />
        )}
        {type === 'Select' && (
          <Select
            allowClear={true}
            showSearch={true}
            optionFilterProp="label"
            placeholder={placeholder ?? '请选择' + label}
            {...(props as SelectProps)}
          />
        )}
        {type === 'Switch' && <Switch {...(props as SwitchProps)} />}
        {type === 'Rate' && <Rate {...(props as RateProps)} />}
        {type === 'TimePicker' && (
          <TimePicker
            allowClear
            onChange={handlerDateChange}
            placeholder={placeholder ?? '请选择' + label}
            {...(props as TimePickerProps)}
          />
        )}
        {type === 'TimeRangePicker' && (
          <TimePicker.RangePicker
            allowClear
            onChange={handlerDateChange}
            placeholder={['开始' + label, '结束' + label]}
            {...(props as TimeRangePickerProps)}
          />
        )}
        {type === 'Upload' && <BaseUpload {...(props as BaseUploadProps)} />}
        {type === 'AutoComplete' && (
          <AutoComplete
            allowClear={true}
            placeholder={placeholder ?? '请输入' + label}
            {...(props as AutoCompleteProps)}
          />
        )}
        {type === 'Cascader' && (
          <Cascader
            allowClear={true}
            placeholder={placeholder ?? '请选择' + label}
            {...(props as any)}
          />
        )}
        {type === 'Checkbox' && <Checkbox {...(props as CheckboxProps)} />}
        {type === 'ColorPicker' && <ColorPicker {...(props as ColorPickerProps)} />}
        {type === 'DatePicker' && (
          <DatePicker
            allowClear
            onChange={handlerDateChange}
            placeholder={placeholder ?? '请选择' + label}
            {...(props as DatePickerProps)}
          />
        )}
        {type === 'DateRangePicker' && (
          <DatePicker.RangePicker
            allowClear
            onChange={handlerDateChange}
            placeholder={['开始' + label, '结束' + label]}
            {...(props as RangePickerProps)}
          />
        )}
        {type === 'Mentions' && (
          <Mentions placeholder={placeholder ?? '请输入' + label} {...(props as MentionsProps)} />
        )}
        {type === 'Radio' && <Radio {...(props as RadioProps)} />}
        {type === 'Slider' && <Slider {...(props as SliderSingleProps)} />}
        {type === 'Transfer' && <Transfer {...(props as TransferProps)} />}
        {type === 'TreeSelect' && (
          <TreeSelect
            allowClear
            placeholder={placeholder ?? '请选择' + label}
            {...(props as TreeSelectProps)}
          />
        )}
      </Form.Item>
    </>
  );
};
export default BaseFormItem;
