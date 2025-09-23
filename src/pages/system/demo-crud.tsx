/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 14:12
 */
import {Button, Checkbox, Form, Input, Row, Space, Table, type TableProps, Tag} from "antd";
import '@/assets/styles/crud.scss'
export default function DemoCrud() {
    // search

    function onSearch(values: object) {
        console.log('Success:', values);
    }


    // table

    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '角色',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === '超级管理员') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>详情</a>
                    <a>修改</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = Array.from({length: 20}).map(value => ( {
        key: '1',
        name: '张三',
        age: 32,
        address: '湖南长沙',
        tags: ['超级管理员', '全栈工程师'],
    }))

    // page with operator
    return (
        <>
            <Space>

            </Space>
            {/*search*/}
            <Row className="search">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onSearch}
                    autoComplete="off"
                    layout={"inline"}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" danger={true} htmlType="submit">
                            导入
                        </Button>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button color={"green"} type={"primary"}  htmlType="submit">
                            导出
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
            {/*table*/}
            <Row className="table">
                <Table style={{width: '100%'}}  columns={columns} dataSource={data} />
            </Row>
        </>
    );
}
