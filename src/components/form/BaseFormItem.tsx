import {Form, Input} from "antd";
import type {BaseEntity} from "@/entity/common.ts";

/**
 * @name: 名称
 * @description: TODO 表单项组件
 * @author: mayn
 * @date: 2025/9/23 17:32
 */
export interface FormItemProps<T extends BaseEntity> {
    // 字段
    field: keyof T;
    // 标签
    label: string;
    // 表单组件类型
    type?: "input" | "textarea" | "select" | "date" | "time" | "datetime" | "checkbox" | "radio" | "switch" | "rate" | "slider" | "upload" | "cascader" | "treeSelect" | "transfer" | "grid" | "gridSelect"

}
const BaseFormItem = (props: FormItemProps) => (
    <Form.Item
        label="用户名"
        name="username"
    >
        <Input placeholder="请输入用户名" />
    </Form.Item>
);
export default BaseFormItem;