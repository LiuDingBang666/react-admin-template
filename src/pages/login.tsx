/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 11:10
 */
import '@/pages/login.scss'
import {Button, Checkbox, Col, Form, Image, Input, message, Row, Grid} from "antd";
import type { FormProps } from 'antd';
import {useNavigate} from "react-router-dom";
import type { ValidateErrorEntity} from "rc-field-form/lib/interface";
import {useUserStore} from "@/store/user-store.ts";
import type {ReactNode} from "react";

export default function Login(): ReactNode {
    // Define form values type
    interface LoginFormValues {
        username: string;
        password: string;
        capture: string;
        remember?: boolean;
    }

    const screens = Grid.useBreakpoint();
    const isMobile = !screens.md; // md and up considered desktop

    const navigate  = useNavigate();

    const { setName } = useUserStore()


    const onFinish: FormProps<LoginFormValues>["onFinish"] = (values) => {
        console.log('Success:', values);
        navigate('/admin/10086?a=1', {
            state: {
                from: 'test demo'
            }
        });
        message.success('登录成功');
        setName(values.username)
    };
    const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
        console.log('Failed:', errorInfo);
    };
  return (
   <Row className="login" justify={"center"} align={"middle"}>
       <Col className="login-form simple" xs={22} sm={16} md={10} lg={7} xl={6}>
           <h1>中国智造</h1>
           <Form
               name="basic"
               layout={isMobile ? 'vertical' : 'horizontal'}
               labelCol={isMobile ? undefined : { span: 4 }}
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
                   className={"capture-form"}
                   rules={[{ required: true, message: '请输入验证码!' }]}
               >
                   <Row align={"middle"} gutter={8} wrap={false}>
                       <Col flex="auto"> <Input placeholder="验证码" aria-label="验证码" maxLength={6} /> </Col>
                       <Col>
                           <Image
                               className="capture"
                               preview={false}
                               alt="验证码"
                               src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                           />
                       </Col>
                   </Row>

               </Form.Item>

               <Form.Item name="remember" valuePropName="checked" className="remember-item" {...(isMobile ? {} : { wrapperCol: { offset: 4, span: 19 } })}>
                   <Checkbox style={{color:'#2d3550', fontWeight:500}}>记住密码</Checkbox>
               </Form.Item>

               <Form.Item {...(isMobile ? {} : { wrapperCol: { offset: 4, span: 19 } })}>
                   <Button type="primary" htmlType="submit" className={"login-button"} size="large">
                       登录
                   </Button>
               </Form.Item>
           </Form>
           <div className="login-footer">© {new Date().getFullYear()} 后台管理系统</div>
       </Col>
   </Row>
  );
}