import { Button, Form, type FormProps, message, Space } from 'antd';
import type { BaseEntity } from '@/entity/common.ts';
import React, { useEffect } from 'react';
import BaseFormItem, { type BaseFormItemProps } from '@/components/form/BaseFormItem.tsx';

interface UpdateProps<T extends BaseEntity> {
  record: T | null;
  close: () => void;
  closeAndRefresh: () => void;
  formConfig?: FormProps;
  formItems?: Array<BaseFormItemProps<T>>;
  update?: (record: T) => Promise<T>;
  add?: (record: T) => Promise<T>;
  handlerValueChange?: (changedValues: object, allValues: object) => void;
}

const FormUpdate: React.FC<UpdateProps<BaseEntity>> = function Update({
  record,
  close,
  closeAndRefresh,
  formConfig,
  formItems,
  update,
  add,
  handlerValueChange,
}) {
  const [formData, setFormData] = React.useState<BaseEntity>(record ?? ({} as BaseEntity));

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
    ...formConfig,
  };

  const tailLayout = {
    wrapperCol: { offset: 9, span: 24 },
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(record ?? {});
  }, []);

  useEffect(() => {
    setFormData(record ?? ({} as BaseEntity));
    form.setFieldsValue(record);
  }, [record]);

  // 处理时间数据
  function handlerUpdateForm(value: object) {
    setFormData({ ...formData, ...value });
  }

  const onFinish = async (values: BaseEntity) => {
    const afterValues = { ...formData, ...values };
    console.log(afterValues);
    if (afterValues.id) {
      await update!(afterValues);
      message.success('更新成功');
    } else {
      await add!(afterValues);
      message.success('添加成功');
    }
    closeAndRefresh();
  };

  return (
    <>
      <Form
        initialValues={formData}
        form={form}
        {...layout}
        name="control-hooks"
        onValuesChange={handlerValueChange}
        onFinish={onFinish}
      >
        {formItems?.map((item, index) => {
          return <BaseFormItem updateForm={handlerUpdateForm} key={index} {...item} />;
        })}
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              确定
            </Button>

            <Button htmlType="button" onClick={close}>
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormUpdate;
