/**
 * @name: 名称
 * @description: TODO 基础表格组件
 * @author: mayn
 * @date: 2025/9/26 15:11
 */
import {Button, Col, Drawer, Form, Input, Pagination, Row, Table, TableColumnsType} from "antd";
import Detail from "@/pages/system/components/detail.tsx";
import Update from "@/pages/system/components/update.tsx";

interface BaseTableProps<T> {
    // 查询参数
    searchParams: object
    // 表格列
    columns: Array<TableColumnsType<T>>
    // 表格操作
    operator?: Array<{
        // 名称
        name: string
        // 回调
        callback?: (record: T) => void
    }>
    // 分页api
    api: (params: never) => Promise<never>
}

function BaseTable(props: BaseTableProps) {
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

export default BaseTable;