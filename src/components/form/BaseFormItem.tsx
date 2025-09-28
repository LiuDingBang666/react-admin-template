import {Form, Input} from "antd";

/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 17:32
 */
interface FormItemProps {

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