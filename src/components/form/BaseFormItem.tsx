import {AutoComplete, Cascader, Checkbox,
    ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Select, Slider, Switch, TimePicker,Rate,
    Transfer, Upload} from "antd";
import type {BaseEntity} from "@/entity/common.ts";
import React from "react";
import type { AutoCompleteProps,CascaderProps,CheckboxProps,ColorPickerProps,DatePickerProps,FormProps,FormItemProps,InputProps,InputNumberProps,MentionsProps,RadioProps,RateProps,SelectProps,SliderSingleProps,SwitchProps,TimePickerProps,TransferProps,UploadProps } from 'antd';

/**
 * @name: 名称
 * @description: TODO 表单项组件
 * @author: mayn
 * @date: 2025/9/23 17:32
 */
export interface BaseFormItemProps<T extends BaseEntity> {
    // 表单配置
    // 字段名称
    name: keyof T;
    // 标签
    label: string;
    // 校验规则
    rules?: object[];
    // 表单组件类型
    type?: "AutoComplete" | "Cascader" | "Checkbox" | "ColorPicker" | "DatePicker" | "Input" | "InputNumber" | "Mentions" | "Radio" | "Rate" | "Select" | "Slider" | "Switch" | "TimePicker" | "Transfer" | "TreeSelect" | "Upload"
    // 表单项配置
    form?: FormItemProps
    // 输入控件配置
    props?:  AutoCompleteProps | CascaderProps | CheckboxProps | ColorPickerProps | DatePickerProps | FormProps | InputProps | InputNumberProps | MentionsProps | RadioProps | RateProps | SelectProps | SliderSingleProps | SwitchProps | TimePickerProps | TransferProps | UploadProps
}
const BaseFormItem: React.FC<BaseFormItemProps<BaseEntity>> = function ({name, label, type,  form, rules, props}) {
    return (
        <>
            <Form.Item
                    label={label}
                    name={name}
                    rules={rules}
                    {...form}
            >
                {type === "Input" && <Input {...(props as InputProps)} />}
                {type === "InputNumber" && <InputNumber {...(props as InputNumberProps)} />}
                {type === "Select" && <Select {...(props as SelectProps)} />}
                {type === "Switch" && <Switch {...(props as SwitchProps)} />}
                {type === "Rate" && <Rate {...(props as RateProps)} />}
                {type === "TimePicker" && <TimePicker {...(props as TimePickerProps)} />}
                {type === "Upload" && <Upload {...(props as UploadProps)} />}
                {type === "AutoComplete" && <AutoComplete {...(props as AutoCompleteProps)} />}
                {type === "Cascader" && <Cascader {...(props as CascaderProps)} />}
                {type === "Checkbox" && <Checkbox {...(props as CheckboxProps)} />}
                {type === "ColorPicker" && <ColorPicker {...(props as ColorPickerProps)} />}
                {type === "DatePicker" && <DatePicker {...(props as DatePickerProps)} />}
                {type === "Mentions" && <Mentions {...(props as MentionsProps)} />}
                {type === "Radio" && <Radio {...(props as RadioProps)} />}
                {type === "Slider" && <Slider {...(props as SliderSingleProps)} />}
                {type === "Transfer" && <Transfer {...(props as TransferProps)} />}
            </Form.Item>
        </>
        )

}
export default BaseFormItem;