import type {
  AutoCompleteProps,
  CascaderProps,
  CheckboxProps,
  ColorPickerProps,
  DatePickerProps,
  FormItemProps,
  InputNumberProps,
  InputProps,
  MentionsProps,
  RadioProps,
  RateProps,
  SelectProps,
  SliderSingleProps,
  SwitchProps,
  TimePickerProps,
  TransferProps,
  TreeSelectProps,
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
import type { BaseEntity } from '@/entity/common.ts';
import React from 'react';
import BaseUpload, { type BaseUploadProps } from '@/components/file-upload/BaseUpload.tsx';

/**
 * @name: 名称
 * @description: TODO 表单项组件
 * @author: mayn
 * @date: 2025/9/23 17:32
 */
export interface BaseFormItemProps<T extends BaseEntity = BaseEntity> {
  // 表单配置
  // 字段名称
  name: keyof T;
  // 标签
  label: string;
  // 表单项配置
  placeholder?: string;
  // 校验规则
  rules?: object[];
  // 表单组件类型
  type?:
    | 'AutoComplete'
    | 'Cascader'
    | 'Checkbox'
    | 'ColorPicker'
    | 'DatePicker'
    | 'Input'
    | 'InputNumber'
    | 'Mentions'
    | 'Radio'
    | 'Rate'
    | 'Select'
    | 'Slider'
    | 'Switch'
    | 'TimePicker'
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
    | BaseUploadProps;
}

// 用具名泛型定义组件，避免 React.FC 在泛型上的限制
const BaseFormItem = <T extends BaseEntity = BaseEntity>({
  name,
  label,
  type,
  form,
  rules,
  props,
  placeholder,
}: BaseFormItemProps<T>) => {
  // 对于开关/复选框，Form.Item 需要 valuePropName='checked'
  const mergedFormItemProps: FormItemProps =
    type === 'Switch' || type === 'Checkbox'
      ? { valuePropName: 'checked', ...(form || {}) }
      : form || {};

  return (
    <>
      <Form.Item label={label} name={name as string} rules={rules} {...mergedFormItemProps}>
        {type === 'Input' && (
          <Input placeholder={placeholder ?? '请输入' + label} {...(props as InputProps)} />
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
            placeholder={placeholder ?? '请选择' + label}
            {...(props as TimePickerProps)}
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
            placeholder={placeholder ?? '请选择' + label}
            {...(props as DatePickerProps)}
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
