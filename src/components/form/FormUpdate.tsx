import { Button, Form, type FormProps, message, Space } from 'antd';
import type {BaseEntity} from "@/entity/common.ts";
import React from "react";
import BaseFormItem, {type BaseFormItemProps} from "@/components/form/BaseFormItem.tsx";

interface UpdateProps<T extends BaseEntity> {
    record: T | null
    onClose: () => void;
    formConfig?: FormProps
    formItems?: Array<BaseFormItemProps<T>>
    update?: (record: T) => Promise<T>
    add?: (record: T) => Promise<T>
}

const FormUpdate: React.FC<UpdateProps<BaseEntity>> = function Update({record, onClose, formConfig, formItems, update, add}){

    const [formData, setFormData] = React.useState<BaseEntity>(record ?? {} as BaseEntity)

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
        ...formConfig
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const [form] = Form.useForm()


    const onFinish = async (values: BaseEntity) => {
        setFormData(values)
        if (values.id) {
          await update!(formData)
          message.success('更新成功')
        } else {
          await add!(formData)
          message.success('添加成功')
        }
        onClose()
    };

    return (
        <Form
            form={form}
            {...layout}
            name="control-hooks"
            onFinish={onFinish}
        >
            {
                formItems?.map((item, index) => {
                    return <BaseFormItem key={index} {...item} />
                })
            }
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                    <Button htmlType="button" onClick={onClose}>
                        取消
                    </Button>

                </Space>
            </Form.Item>
        </Form>
    );
}
export default FormUpdate;