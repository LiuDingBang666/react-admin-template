import { Card, Descriptions, Avatar, Space, Typography } from 'antd';
import type { ReactElement } from 'react';

export default function PersonalInfo(): ReactElement {
  return (
    <Card title="个人信息">
      <Space align="start" size={24}>
        <Avatar
          size={80}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Descriptions column={1} size="middle" labelStyle={{ width: 100 }}>
          <Descriptions.Item label="用户名">admin</Descriptions.Item>
          <Descriptions.Item label="昵称">超级管理员</Descriptions.Item>
          <Descriptions.Item label="邮箱">admin@example.com</Descriptions.Item>
          <Descriptions.Item label="手机号">13800000000</Descriptions.Item>
          <Descriptions.Item label="所属部门">技术部</Descriptions.Item>
        </Descriptions>
      </Space>
      <Typography.Paragraph type="secondary" style={{ marginTop: 16 }}>
        此页面为静态演示路由。可在接入真实接口后替换为实际数据。
      </Typography.Paragraph>
    </Card>
  );
}
