import { Button, Form, Input, Select, Space } from 'antd';
import type {BaseEntity} from "@/entity/common.ts";

interface UpdateProps<T extends BaseEntity> {
    record: T | null
    onClose: () => void;
}

const Update = function Update(props:UpdateProps<BaseEntity>){

    const { Option } = Select;

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };


    const onFinish = (values: object) => {
        console.log(values);
    };

    return (
        <Form
            {...layout}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="note" label="Note" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({ getFieldValue }) =>
                    getFieldValue('gender') === 'other' ? (
                        <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={props.onClose}>
                        Reset
                    </Button>

                </Space>
            </Form.Item>
        </Form>
    );
}
export default Update;