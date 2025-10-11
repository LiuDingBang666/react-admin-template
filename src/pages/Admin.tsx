/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 13:13
 */

import React, { type ReactElement } from 'react';
import './admin.scss';
import {
  DownOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dropdown, type MenuProps, message, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Image } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user-store.ts';
import { logout } from '@/api/system/login.ts';

const { Header, Content, Sider } = Layout;

const Admin = (): ReactElement => {
  const { getName } = useUserStore();

  const items1: MenuProps['items'] = ['1'].map((key) => ({
    key,
    label: `系统`,
  }));

  const items2: MenuProps['items'] = [UserOutlined].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `菜单名称`,
      children: Array.from({ length: 1 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `模块名称`,
        };
      }),
    };
  });

  // search params
  // const [searchParams] = useSearchParams();
  // console.log(searchParams);
  //
  // // path params
  // const { id } = useParams();
  // console.log(id);
  //
  // // router location params
  // const { state } = useLocation();
  // console.log(state.from);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { reset } = useUserStore();
  const router = useNavigate();
  async function handlerClick(e: { key: string }) {
    if (e.key === '5') {
      await logout();
      reset();
      router('/login');
      message.success('退出成功');
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: getName(),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: '个人信息',
      icon: <InfoCircleOutlined />,
    },
    {
      key: '4',
      label: '系统设置',
      icon: <SettingOutlined />,
    },
    {
      key: '5',
      label: '退出',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout className={'layout'}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div className={'user-info'}>
          <Image
            className={'user-avatar'}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Dropdown menu={{ items, onClick: handlerClick }}>
            <a>
              <Space>
                {getName()}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderInlineEnd: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: '系统' }, { title: '系统设置' }, { title: '用户管理' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Admin;
