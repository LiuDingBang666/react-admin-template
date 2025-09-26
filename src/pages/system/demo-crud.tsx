/**
 * @name: 名称
 * @description: TODO CRUD 示例
 * @author: mayn
 * @date: 2025/9/23 14:12
 */
import {
    Button,
    Col,
    Drawer,
    Form,
    type GetProp,
    Input, message, Pagination, Popconfirm,
    Row,
    Space,
    Table,
    type TableProps,
    Tag
} from "antd";

import '@/assets/styles/crud.scss'
import {useEffect, useState} from "react";
import type {SorterResult} from "antd/es/table/interface";
import Detail from "@/pages/system/components/detail.tsx";
import Update from "@/pages/system/components/update.tsx";



interface DataType {
    id: string
    name: string;
    age: number;
    address: string;
    tags: string[];
}


type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
    // 分页参数
    pagination?: TablePaginationConfig;
    // 排序参数
    sortField?: SorterResult<object>['field'];
    // 排序参数
    sortOrder?: SorterResult<object>['order'];
    // 过滤参数
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
    // 查询参数
    searchParams: object
}


export default function DemoCrud() {
    // search
    function onSearch(values: object) {
        console.log('Success:', values);
        fetchData()
    }

    // page
    const [data, setData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
            total:0
        },
        searchParams: {}
    });


    // 加载数据
    const fetchData = () => {
        setData([]);
        setLoading(true);
        setTimeout(() => {
            const data= Array.from({length: 200}).map((_value, index) => ( {
                id: String(index), // 修正为字符串，符合 DataType 类型
                name: '张三',
                age: 32,
                address: '湖南长沙',
                tags: ['超级管理员', '全栈工程师'],
            })) as unknown as  DataType[]
            setData(() => data);
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: data.length,
                },
            });
        }, 200)

    };

    // 初始加载
    useEffect(() => {
        fetchData();
    }, []);

    // 变化加载
    useEffect(fetchData, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);

    // 表格改变
    const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
            searchParams: tableParams.searchParams
        });
    };


    // 删除
    function handlerDelConfirm( record: DataType) {
        console.log('删除确认', record);
        message.success('删除成功')
        setSelectedRowKeys([])
        fetchData()
    }


    // 详情及更新
    const [open, setOpen] = useState(false);

    const [type, setType] = useState<'detail' | 'update'  | 'add'>('detail');

    const showDrawer = (type: 'detail' | 'update'  | 'add') => {
        setType(type)
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    // config
    const columns: TableProps<DataType>['columns'] = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            render: (_value, _record, index) => {
                return index + 1
            },
            width: 80,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            width: 100,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 100,
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
            width: 500,
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showDrawer('detail')}>详情</a>
                    <a onClick={() => showDrawer('update')}>修改</a>
                    <Popconfirm
                        title="删除确认"
                        description="您确认要删除该条记录嘛?"
                        onConfirm={() => handlerDelConfirm(record)}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a style={{color: 'red'}}>删除</a>
                    </Popconfirm>

                </Space>
            ),
            width: 200,
        },
    ];

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
                        <Button type="primary"  onClick={() => showDrawer('add')}>
                            新增
                        </Button>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" danger={true}>
                            导入
                        </Button>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button color={"green"} type={"primary"} >
                            导出
                        </Button>
                    </Form.Item>
                </Form>
            </Row>

            {/*table*/}
            <Row className="table">
                <Table
                    style={{width: '100%', height: '100%'}}
                    bordered={true}
                    columns={columns}
                    dataSource={data}
                    />
            </Row>

            {/*额外操作*/}

                <Row className="pagination-operator">
                    <Col span={12}>                <Button type="primary" danger={true} disabled={selectedRowKeys.length == 0}>批量删除</Button>
                    </Col>
                    <Col span={12}>
                        <Pagination
                            showQuickJumper
                            showSizeChanger
                            showTotal={(total, range) => `共 ${total} 条数据`}
                            align={"end"}
                            defaultCurrent={1}
                            total={tableParams.pagination?.total}
                            onChange={(page, pageSize) => {
                                console.log(page, pageSize);
                                setTableParams({
                                    ...tableParams,
                                    pagination: {
                                        ...tableParams.pagination,
                                        current: page,
                                        pageSize: pageSize,
                                    },
                                });
                            }}
                        />
                    </Col>
                </Row>

            {/* 更新 */}
            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    User Profile {type}
                </p>
                {type === 'detail' ? Detail() : Update({onClose})}
            </Drawer>
            </>
    )
}
