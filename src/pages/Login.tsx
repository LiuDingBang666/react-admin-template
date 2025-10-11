/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 11:10
 */
import '@/pages/login.scss';
import { Button, Checkbox, Col, Form, Image, Input, message, Row, Grid } from 'antd';
import type { FormProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useUserStore } from '@/store/user-store.ts';
import { type ReactElement, useEffect, useRef, useState } from 'react';
import { getKaptcha, getRsaPublicKey, passwordLogin } from '@/api/system/login.ts';
import RSA from '@/utils/rsa.ts';
// Define form values type
interface LoginFormValues {
  username: string;
  password: string;
  capture: string;
  remember?: boolean;
}

export default function Login(): ReactElement {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md; // md and up considered desktop

  const navigate = useNavigate();

  const { setData } = useUserStore();
  const [kaptcha, setKaptcha] = useState<string>('');
  const [kaptchaId, setKaptchaId] = useState<string>('');

  function refreshKaptcha() {
    getKaptcha().then((res) => {
      const url = URL.createObjectURL(res.data);
      setKaptchaId((res.headers! as { kaptchaid: string }).kaptchaid);
      setKaptcha(url);
    });
  }

  useEffect(() => {
    refreshKaptcha();
  }, []);

  // rsa
  const rsaPublicKey = useRef<string>('');

  const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values) => {
    const { data } = await getRsaPublicKey();
    rsaPublicKey.current = data;
    const encryptPassword = RSA.encrypt(values.password, rsaPublicKey.current);
    const { data: userInfo } = await passwordLogin({
      username: values.username,
      password: encryptPassword,
      code: values.capture,
      key: kaptchaId,
      rsaPublicKey: rsaPublicKey.current,
    });
    message.success('登录成功');
    setData(userInfo);
    navigate('/admin');
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();

  return (
    <Row className="login" justify={'center'} align={'middle'}>
      <Col className="login-form simple" xs={22} sm={16} md={10} lg={7} xl={6}>
        <h1>后台管理系统</h1>
        <Form
          form={form}
          name="basic"
          layout={isMobile ? 'vertical' : 'horizontal'}
          labelCol={isMobile ? undefined : { span: 6 }}
          wrapperCol={isMobile ? undefined : { span: 19 }}
          initialValues={{ remember: true } as Partial<LoginFormValues>}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input placeholder="请输入用户名" allowClear autoFocus aria-label="用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入用户密码!' }]}
          >
            <Input.Password placeholder="请输入密码" aria-label="密码" />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="capture"
            className={'capture-form'}
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <Row align={'middle'} gutter={8} wrap={false}>
              <Col flex="auto">
                {' '}
                <Input placeholder="验证码" aria-label="验证码" maxLength={6} />{' '}
              </Col>
              <Col>
                <Image
                  onClick={refreshKaptcha}
                  className="capture"
                  preview={false}
                  alt="验证码"
                  src={kaptcha}
                />
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            className="remember-item"
            {...(isMobile ? {} : { wrapperCol: { offset: 4, span: 19 } })}
          >
            <Checkbox style={{ color: '#2d3550', fontWeight: 500 }}>记住密码</Checkbox>
          </Form.Item>

          <Form.Item {...(isMobile ? {} : { wrapperCol: { offset: 4, span: 19 } })}>
            <Button type="primary" htmlType="submit" className={'login-button'} size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="login-footer">© {new Date().getFullYear()} 后台管理系统</div>
      </Col>
    </Row>
  );
}
