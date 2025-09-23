/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 14:12
 */
import {Button, Checkbox, Form, Input, Row, Space, Table, type TableProps, Tag} from "antd";
import '@/assets/styles/crud.scss'
import {useId, useState} from "react";
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

    const data: DataType[] = Array.from({length: 20}).map(() => ( {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        key: useId(),
        name: '张三',
        age: 32,
        address: '湖南长沙',
        tags: ['超级管理员', '全栈工程师'],
    }))

    // config

    // 复选
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection: TableProps<DataType>['rowSelection'] = {
        // 这里配置多选还是单选
        selectedRowKeys,
        // 选择项发生变化时的回调
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`选择的keys: ${selectedRowKeys}`, '选择的rows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys);

        },
        // 配置不能被选中
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === '李四',
            name: record.name,
        }),
        // 自定义选择项
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: '选择偶数行',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            }
        ],
    };


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
                        <Input placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input placeholder="请输入用户名"  />
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input placeholder="请输入用户名"  />
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
                <Table style={{width: '100%'}}  columns={columns} dataSource={data} rowSelection={{type: 'checkbox', ...rowSelection}}/>
            </Row>
            {/*额外操作*/}
            <div className="extraOperators">
                <Button type="primary" danger={true} disabled={selectedRowKeys.length == 0}>批量删除</Button>
            </div>
        </>
    );
}
