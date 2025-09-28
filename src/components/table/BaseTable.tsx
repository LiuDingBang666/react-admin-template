/**
 * @name: 名称
 * @description: TODO 基础表格组件
 * @author: mayn
 * @date: 2025/9/26 15:11
 */
import {
    Button,
    Col,
    Form,
    type GetProp, message,
    Pagination, Popconfirm,
    Row, Space,
    Table,
} from "antd";
import '@/assets/styles/crud.scss'
import  type {TableProps} from 'antd'
import FormDetail, {type FormDetailProps} from "@/components/form/FormDetail.tsx";
import FormUpdate from "@/components/form/FormUpdate.tsx";
import BaseFormItem, {type FormItemProps} from "@/components/form/BaseFormItem.tsx";
import {type CSSProperties, type JSX, type ReactElement,  useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {BaseEntity, BasePage, BaseResult, RequestParams} from "@/entity/common.ts";
import {PermissionWrapComponent} from "@/components/PermissionWrapComponent.tsx";
import BaseDrawer, {type BaseDrawerRef} from "@/components/drawer/BaseDrawer.tsx";

type OperatorType = '详情' | '修改' | '新增'

interface OperatorProps<T extends BaseEntity>{
    // 名称
    name: string
    // 回调
    callback?: (record: T) => void
    // 是否显示
    show?: (record: T) => boolean
    // 权限值
    permission?: string
    // 样式
    style?: CSSProperties
}

interface BaseTableProps<T extends BaseEntity> {
    // 基础配置

    // 搜索栏配置
    searchs: Array<FormItemProps<T>>
    // 表格列
    columns: TableProps<T>['columns']
    // 搜索栏的操作
    searchOperator?: Array<JSX.Element>
    // 扩展操作
    operator?: Array<OperatorProps<T>>
    // 查询参数-请求时将合并
    searchParams?: object

    // 权限

    // 表格名称
    name: string

    // 权限前缀
    permissionPrefix?: string

    // 内置CRUD操作

    // 分页api
    api: (params: RequestParams) => Promise<unknown>
    // 导入api
    importApi?: (params: never) => Promise<boolean>
    // 导出api
    exportApi?: (params: object) => Promise<string>
    // 批量删除api
    deleteApi?: (ids: Array< string>) => Promise<boolean>
    // 新增api
    addApi?: (params: never) => Promise<T>
    // 修改api
    updateApi?: (params: never) => Promise<T>
    // 详情api
    detailApi?: (id: string) => Promise<T>
    // 详情配置
    detail?: Array<FormDetailProps<T>>
    // 新增/修改配置
    updateFields?: Array<FormItemProps<T>>


    // 插槽操作-自定义情况
    slots?: {
        detail: (record: T) => JSX.Element
        update: (record: T) => JSX.Element
    }

}

// 分页配置
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
    // 分页参数
    pagination: TablePaginationConfig
    // 查询参数
    searchParams: object
}


function BaseTable(props: BaseTableProps<never>) {

    // page
    const [data, setData] = useState<Array<BaseEntity>>([]);
    const [loading, setLoading] = useState(false);

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        searchParams: {}
    });

    // 查询
    async function onSearch(values: object) {
       fetchData(values)
    }

    // 分页
    function onPaginationChange(page: number, pageSize: number){
        setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                current: page,
                pageSize: pageSize,
            },
        });
    }

    // 加载数据
    const fetchData = useCallback( (extraParams: object = {}) => {
        async function executeFetch() {
            if (props.api !== undefined) {
                setData([]);
                setLoading(true);
                 
                const {data}: BaseResult<BasePage<BaseEntity>> = await props.api({...tableParams.searchParams,...props.searchParams, ...extraParams, pageNum: tableParams.pagination.current, pageSize: tableParams.pagination.pageSize})
                setData(() => data.list as Array<BaseEntity>);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total:data.total,
                    },
                });
            }
        }
        executeFetch().then()
    }, [props, tableParams])


    // 初始加载
    useEffect(() => {
        fetchData();
    }, []);

    // 变化加载
    useEffect(fetchData, [
        tableParams.pagination.current,
        tableParams.pagination.pageSize
    ]);

    // 删除
    async function handlerDelConfirm(record: BaseEntity) {
        if (props.deleteApi !== undefined) {
            await props.deleteApi([record.id])
        }
        message.success('删除成功')
        await fetchData()
    }

    // 批量删除
    async function handlerDelBatchConfirm() {
        if (props.deleteApi !== undefined && selectedRowKeys.length > 0) {
            await props.deleteApi(selectedRowKeys as Array<string>)
            message.success('批量删除成功')
            setSelectedRowKeys([])
            await fetchData()
        }
    }

    // config
    // @ts-disable-next-line
    const columns: TableProps<BaseEntity>['columns'] = [
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
         
        ...props.columns,
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            render: (_, record) => (
                <Space size="middle">
                    {
                        props.detailApi &&
                        <a onClick={() => showDrawer('详情',record)}>详情</a>
                    }
                    {
                        props.updateApi &&
                        <a onClick={() => showDrawer('修改',record)}>修改</a>
                    }
                    {
                        props.deleteApi &&
                        <Popconfirm
                            title="删除确认"
                            description="您确认要删除该条记录嘛?"
                            onConfirm={() => handlerDelConfirm(record)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a style={{color: 'red'}}>删除</a>
                        </Popconfirm>

                    }
                    {
                        props.operator?.map(item => {
                            return (
                                <a
                                    key={item.name}
                                    onClick={() => item.callback?.(record)}
                                    style={{
                                        display: item.show?.(record) ? 'inline-block' : 'none'
                                    }}
                                >
                                    {item.name}
                                </a>
                            )
                        })
                    }
                </Space>
            ),
            width: 200,
        },
    ];

    // 复选
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const rowSelection: TableProps<BaseEntity>['rowSelection'] = {
        // 这里配置多选还是单选
        selectedRowKeys,
        // 选择项发生变化时的回调
        onChange: (selectedRowKeys: React.Key[], selectedRows: BaseEntity[]) => {
            console.log(`选择的keys: ${selectedRowKeys}`, '选择的rows: ', selectedRows);
            setSelectedRowKeys(selectedRowKeys);

        },
        // 配置不能被选中
        getCheckboxProps: (record: BaseEntity) => ({
            disabled: !record.id,
            name: record.id,
        }) as never,
        // 自定义选择项
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE
        ],
    };


    // 详情及更新

    // 当前操作数据
    const [activeRecord, setActiveRecord] = useState<BaseEntity | null>({} as BaseEntity);
    // 操作类型
    const [type, setType] = useState<OperatorType>('新增');

    // 打开抽屉
    const showDrawer = async (type: OperatorType, record: BaseEntity | null = null) => {
        setType(type)
        drawerRef.current?.open()
        if (record) {
            if (props.detailApi !== undefined) {
               const {data} = await props.detailApi(record.id)
               setActiveRecord(data)
            } else {
               setActiveRecord(record)
            }
        }
    };

    // 关闭抽屉
    const onClose = () => {
        drawerRef.current?.close()
    };

    const drawerRef = useRef<BaseDrawerRef>(null)

    // 渲染内容
    const renderContent = useMemo<ReactElement>(() => {
        return (type === '新增' ? props.slots?.update ?? <FormUpdate record={activeRecord} onClose={onClose}/> : props.slots?.detail ?? <FormDetail record={activeRecord} config={props.detail}/>) as ReactElement
    }, [activeRecord, props.slots?.detail, props.slots?.update, type])

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
                        {props.searchs.map((item, index) => (
                            <BaseFormItem {...item} key={index}/>
                        ))}

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                        {
                            props.addApi &&
                            <Form.Item label={null}>
                                {PermissionWrapComponent({
                                    permission: props.permissionPrefix + '新增',
                                    children:   <Button type="primary"  onClick={() => showDrawer('新增')}>
                                        新增
                                    </Button>
                                })}
                            </Form.Item>
                        }
                        { props.importApi &&
                           PermissionWrapComponent( {
                               permission: props.permissionPrefix + '导入',
                               children:   <Form.Item label={null}>
                                   <Button type="primary" danger={true}>
                                       导入
                                   </Button>
                               </Form.Item>
                           })
                        }

                        {
                            props.exportApi &&  PermissionWrapComponent( {
                                permission: props.permissionPrefix + '导出',
                                children:  <Form.Item label={null}>
                                    <Button color={"green"} type={"primary"} >
                                        导出
                                    </Button>
                                </Form.Item>
                            })
                        }
                        {
                            props.searchOperator
                        }
                    </Form>
                </Row>

                {/*table*/}

                <Row className="table">
                    <Table
                        style={{width: '100%', height: '100%'}}
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowSelection={rowSelection}
                        scroll={{
                            y: "64vh",
                        }}
                        pagination={false}
                    />
                </Row>

                {/*额外操作*/}
                <Row className="pagination-operator">
                    <Col span={12}>
                        {
                            props.deleteApi &&
                            PermissionWrapComponent( {
                                permission: props.permissionPrefix + '删除',
                                children:   <Button type="primary" danger={true} disabled={selectedRowKeys.length == 0} onClick={handlerDelBatchConfirm}>批量删除</Button>
                            })
                        }
                    </Col>
                    <Col span={12}>
                        <Pagination
                            showQuickJumper
                            showSizeChanger
                            showTotal={(total) => `共 ${total} 条数据`}
                            align={"end"}
                            defaultCurrent={1}
                            total={tableParams.pagination?.total}
                            onChange={onPaginationChange}
                        />
                    </Col>
                </Row>

                {/* 更新 */}
                <BaseDrawer ref={drawerRef} title={props.name + type} onClose={onClose} record={activeRecord}>
                    {renderContent}
                </BaseDrawer>
            </>
    )
}

export default BaseTable;