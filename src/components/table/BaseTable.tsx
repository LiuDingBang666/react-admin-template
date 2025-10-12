/**
 * @name: 名称
 * @description: TODO 基础表格组件
 * @author: mayn
 * @date: 2025/9/26 15:11
 */
import type { TableProps } from 'antd';
import {
  Button,
  type ButtonProps,
  Col,
  Form,
  type FormProps,
  type GetProp,
  message,
  Pagination,
  Popconfirm,
  Row,
  Space,
  Table,
} from 'antd';
import '@/assets/styles/crud.scss';
import FormDetail, { type FormDetailConfigProps } from '@/components/form/FormDetail.tsx';
import FormUpdate from '@/components/form/FormUpdate.tsx';
import BaseFormItem, { type BaseFormItemProps } from '@/components/form/BaseFormItem.tsx';
import React, { type JSX, type ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import type { BaseEntity, BasePage, BaseResult, RequestParams } from '@/entity/common.ts';
import { PermissionWrapComponent } from '@/components/PermissionWrapComponent.tsx';
import BaseDrawer, { type BaseDrawerRef } from '@/components/drawer/BaseDrawer.tsx';
import ImportBtn from '@/components/import/ImportBtn.tsx';

type OperatorType = '详情' | '修改' | '新增';

interface OperatorProps<T extends BaseEntity> {
  // 名称
  name: string;
  // 回调
  callback?: (record: object) => void;
  // 是否显示
  show?: (record: T) => boolean;
  // 权限值
  permission?: string;
  // 样式
  style?: ButtonProps;
}

interface BaseTableProps<T extends BaseEntity = BaseEntity> {
  children?: JSX.Element | null;
  // 基础配置

  // 搜索栏配置
  searchs: Array<BaseFormItemProps<T>>;
  // 表格列
  columns: TableProps<T>['columns'];
  // 搜索栏的操作
  searchOperator?: Array<JSX.Element>;
  // 扩展操作
  operator?: Array<OperatorProps<T>>;
  // 扩展批量操作
  batchOperator?: Array<OperatorProps<T>>;
  // 查询参数-请求时将合并
  searchParams?: object;

  // 权限

  // 表格名称
  name: string;

  // 权限前缀
  permissionPrefix?: string;

  // 内置CRUD操作
  // 新增/修改表单配置
  form?: FormProps;
  // 新增表单配置
  formItems?: Array<BaseFormItemProps<T>>;
  // 分页api
  api: (params: RequestParams) => Promise<BaseResult<BasePage<T>>>;
  // 导入api
  importApi?: (params: FormData) => Promise<BaseResult<boolean>>;
  // 导入模板api
  importTemplateApi?: () => Promise<Blob>;
  // 导出api
  exportApi?: (params: RequestParams) => Promise<Blob>;
  // 批量删除api
  deleteApi?: (ids: Array<string>) => Promise<boolean>;
  // 新增api
  addApi?: (params: RequestParams) => Promise<T>;
  // 修改api
  updateApi?: (params: RequestParams) => Promise<T>;
  // 详情api
  detailApi?: (id: string) => Promise<T>;
  // 详情配置
  detail?: FormDetailConfigProps<T>[] | null | undefined;

  // 事件
  onValueChange?: (changedValues: object, allValues: object) => void;
  onSearchBefore?: (params: RequestParams) => void;
  onGetDetailAfter?: (params: T) => void;
  onDeleteBefore?: (params: Array<string>) => void;
  onUpdateBefore?: (params: RequestParams) => void;
  onTypeChange?: (type: OperatorType, record?: T) => void;

  // 插槽操作-自定义情况
  slots?: {
    detail: (props: { record: T; close: () => void; closeAndRefresh: () => void }) => JSX.Element;
    update: (props: { record: T; close: () => void; closeAndRefresh: () => void }) => JSX.Element;
  };
}

// 分页配置
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  // 分页参数
  pagination: TablePaginationConfig;
  // 查询参数
  searchParams: object;
}

function BaseTable(props: BaseTableProps<any>) {
  // page
  const [data, setData] = useState<Array<BaseEntity>>([]);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
    searchParams: {},
  });

  // 查询
  function onSearch(values: RequestParams, search = true) {
    if (search) {
      fetchData({
        ...tableParams.searchParams,
        ...values,
      });
    }
  }

  // 更新表单值
  function handlerUpdateForm(changedValues: any) {
    onSearch(changedValues, false);
  }

  // 分页
  function onPaginationChange(page: number, pageSize: number) {
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
  const fetchData = (extraParams: object = {}) => {
    async function executeFetch() {
      if (props.api !== undefined) {
        setData([]);
        setLoading(true);
        const values = { ...tableParams.searchParams, ...props.searchParams, ...extraParams };
        if (props.onSearchBefore) {
          props.onSearchBefore(values);
        }
        const { data } = await props.api({
          ...values,
          pageNum: tableParams.pagination.current,
          pageSize: tableParams.pagination.pageSize,
        });
        setData(() => data.list as Array<BaseEntity>);
        setLoading(false);
        setTableParams({
          searchParams: values,
          pagination: {
            ...tableParams.pagination,
            total: data.total,
          },
        });
      }
    }
    executeFetch().then();
  };

  // 初始加载

  // 变化加载
  useEffect(fetchData, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  // 导出
  function handleExport() {
    if (props.exportApi !== undefined) {
      props.exportApi({ ...tableParams.searchParams, ...props.searchParams }).then((res) => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download =
          props.name +
          '_导出_' +
          new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) +
          '.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        message.success('导出成功');
      });
    }
  }

  // 删除
  async function handlerDelConfirm(record: BaseEntity) {
    if (props.deleteApi !== undefined) {
      if (props.onDeleteBefore) {
        props.onDeleteBefore([record.id]);
      }
      await props.deleteApi([record.id]);
    }
    message.success('删除成功');
    await fetchData();
  }

  // 批量删除
  async function handlerDelBatchConfirm() {
    if (props.deleteApi !== undefined && selectedRowKeys.length > 0) {
      if (props.onDeleteBefore) {
        props.onDeleteBefore(selectedRowKeys as Array<string>);
      }
      await props.deleteApi(selectedRowKeys as Array<string>);
      message.success('批量删除成功');
      setSelectedRowKeys([]);
      await fetchData();
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
        return index + 1;
      },
      width: 80,
    },
    ...(props.columns ?? []),
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          {props.detailApi && <a onClick={() => showDrawer('详情', record)}>详情</a>}
          {props.updateApi && <a onClick={() => showDrawer('修改', record)}>修改</a>}
          {props.deleteApi && (
            <Popconfirm
              title="删除确认"
              description="您确认要删除该条记录嘛?"
              onConfirm={() => handlerDelConfirm(record)}
              okText="确认"
              cancelText="取消"
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          )}
          {props.operator?.map((item) => {
            return (
              <a
                key={item.name}
                onClick={() => item.callback?.(record)}
                style={{
                  display: item.show?.(record) ? 'inline-block' : 'none',
                }}
              >
                {item.name}
              </a>
            );
          })}
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
    getCheckboxProps: (record: BaseEntity) =>
      ({
        disabled: !record.id,
        name: record.id,
      }) as never,
    // 自定义选择项
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  // 详情及更新

  // 当前操作数据
  const [activeRecord, setActiveRecord] = useState<BaseEntity | null>({} as BaseEntity);
  // 操作类型
  const [type, setType] = useState<OperatorType>('新增');
  // 类型变化
  useEffect(() => {
    console.log('load');

    if (props.onTypeChange) {
      props.onTypeChange(type, activeRecord);
    }
  }, [activeRecord, props, type]);
  // 打开抽屉
  const showDrawer = async (type: OperatorType, record: BaseEntity | null = null) => {
    setType(type);
    drawerRef.current?.open();
    if (record) {
      if (props.detailApi !== undefined) {
        const { data } = await props.detailApi(record.id);
        if (props.onGetDetailAfter) {
          props.onGetDetailAfter(data);
        }
        setActiveRecord(data as BaseEntity);
      } else {
        setActiveRecord(record);
      }
    } else {
      setActiveRecord({} as BaseEntity);
    }
  };

  // 关闭抽屉
  const onClose = () => {
    drawerRef.current?.close();
  };

  // 刷新
  const onRefresh = () => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
    onClose();
  };

  const drawerRef = useRef<BaseDrawerRef>(null);

  // 渲染内容
  const RenderContent = useMemo<ReactElement>(() => {
    return (
      type !== '详情' ? (
        props.slots?.update ? (
          <props.slots.update record={activeRecord} close={onClose} closeAndRefresh={onRefresh} />
        ) : (
          <FormUpdate
            record={activeRecord}
            close={onClose}
            closeAndRefresh={onRefresh}
            formConfig={props.form}
            formItems={props.formItems}
            handlerValueChange={props.onValueChange}
          />
        )
      ) : props.slots?.detail ? (
        <props.slots.detail record={activeRecord} close={onClose} closeAndRefresh={onRefresh} />
      ) : (
        <FormDetail record={activeRecord} config={props.detail} />
      )
    ) as ReactElement;
  }, [
    activeRecord,
    onRefresh,
    props.detail,
    props.form,
    props.formItems,
    props.slots?.detail,
    props.slots?.update,
    type,
  ]);

  const [form] = Form.useForm();

  // 计算可滚动高度
  const [scrollHeight, setScrollHeight] = useState<number | undefined>();

  function computedScrollHeight() {
    const dom = document.querySelector('.table-box');
    if (dom) {
      setScrollHeight(dom.clientHeight - 230);
    }
  }

  useEffect(() => {
    computedScrollHeight();
    // 观察窗口变化
    window.addEventListener('resize', computedScrollHeight);
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);
  return (
    <>
      <div className="table-box">
        {/*search*/}
        <Row className="search">
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSearch}
            autoComplete="off"
            layout={'inline'}
          >
            {props.searchs.map((item, index) => (
              <BaseFormItem {...item} key={index} updateForm={handlerUpdateForm} />
            ))}

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
            {props.addApi && (
              <Form.Item label={null}>
                {PermissionWrapComponent({
                  permission: props.permissionPrefix + '新增',
                  children: (
                    <Button type="primary" onClick={() => showDrawer('新增')}>
                      新增
                    </Button>
                  ),
                })}
              </Form.Item>
            )}
            {props.importApi &&
              PermissionWrapComponent({
                permission: props.permissionPrefix + '导入',
                children: (
                  <Form.Item label={null}>
                    <ImportBtn
                      importAction={props.importApi}
                      templateAction={props.importTemplateApi}
                    />
                  </Form.Item>
                ),
              })}

            {props.exportApi &&
              PermissionWrapComponent({
                permission: props.permissionPrefix + '导出',
                children: (
                  <Form.Item label={null}>
                    <Button color={'green'} type={'primary'} onClick={handleExport}>
                      导出
                    </Button>
                  </Form.Item>
                ),
              })}
            {props.searchOperator}
          </Form>
        </Row>

        {/*table*/}
        <Row className="table">
          <Table
            style={{ width: '100%', height: '100%' }}
            bordered={true}
            columns={columns}
            rowKey="id"
            dataSource={data}
            loading={loading}
            rowSelection={rowSelection}
            pagination={false}
            scroll={{ y: scrollHeight }}
          />
        </Row>

        {/*额外操作*/}
        <Row className="pagination-operator">
          <Col span={12}>
            {props.deleteApi &&
              PermissionWrapComponent({
                permission: props.permissionPrefix + '删除',
                children: (
                  <Popconfirm
                    title="删除确认"
                    description="您确认要删除选中的记录嘛?"
                    onConfirm={() => handlerDelBatchConfirm()}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button type="primary" danger={true} disabled={selectedRowKeys.length == 0}>
                      批量删除
                    </Button>
                  </Popconfirm>
                ),
              })}
            {props.batchOperator &&
              props.batchOperator.map((item, index) => (
                <Button
                  key={index}
                  type="primary"
                  {...item.style}
                  disabled={selectedRowKeys.length == 0}
                  onClick={() =>
                    item.callback?.({ selectedRowKeys, clear: () => setSelectedRowKeys([]) })
                  }
                >
                  {item.name}
                </Button>
              ))}
          </Col>
          <Col span={12}>
            <Pagination
              showQuickJumper
              showSizeChanger
              showTotal={(total) => `共 ${total} 条数据`}
              align={'end'}
              defaultCurrent={1}
              total={tableParams.pagination?.total}
              onChange={onPaginationChange}
            />
          </Col>
        </Row>

        {/* 更新 */}
        <BaseDrawer
          ref={drawerRef}
          title={props.name + type}
          onClose={onClose}
          record={activeRecord}
        >
          {RenderContent}
        </BaseDrawer>
      </div>
      {props.children}
    </>
  );
}

export default BaseTable;
