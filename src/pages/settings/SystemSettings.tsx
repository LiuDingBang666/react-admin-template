import { Card, Divider, Switch, Form, InputNumber, Select, Space, Typography } from 'antd';
import type { ReactElement } from 'react';

export default function SystemSettings(): ReactElement {
  return (
    <Card title="系统设置">
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Typography.Paragraph type="secondary">
          此页面为静态演示路由。接入真实接口后可持久化设置到后台。
        </Typography.Paragraph>

        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          initialValues={{
            darkMode: false,
            pageSize: 10,
            language: 'zh-CN',
          }}
        >
          <Form.Item label="深色模式" name="darkMode" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="默认分页大小" name="pageSize">
            <InputNumber min={5} max={100} />
          </Form.Item>
          <Form.Item label="界面语言" name="language">
            <Select
              options={[
                { label: '简体中文', value: 'zh-CN' },
                { label: 'English', value: 'en-US' },
              ]}
              style={{ width: 200 }}
            />
          </Form.Item>
        </Form>

        <Divider />
        <Typography.Paragraph>
          以上设置仅为静态示例，不会保存。如需落库，请在提交时调用相应 API。
        </Typography.Paragraph>
      </Space>
    </Card>
  );
}
