/**
 * @name: 名称
 * @description: TODO 数据详情组件
 * @author: mayn
 * @date: 2025/9/28 11:23
 */
import  {forwardRef, type JSX, useImperativeHandle, useState} from "react";
import {Col, Drawer, Row, Space} from "antd";
import type {BaseEntity} from "@/entity/common.ts";
import {ClockCircleOutlined, UserAddOutlined, UsergroupAddOutlined} from "@ant-design/icons";

// 定义属性接口
interface BaseDrawerProps {
    // 标题
    title: string;
    // 子组件
    children?: JSX.Element;
    // 关闭回调
    onClose?: () => void;
    // 数据
    record?: BaseEntity | null;
}
// 定义ref接口
export interface BaseDrawerRef {
    open: () => void;
    close: () => void;
}

const BaseDrawer = forwardRef<BaseDrawerRef, BaseDrawerProps>( (props, refs) => {
    const { title, children, onClose } = props;
    // 详情及更新
    const [open, setOpen] = useState(false);

    // 使用api给父组件暴露方法
    useImperativeHandle(refs, () => ({
        open: () => {
            setOpen(true);
        },
        close: () => {
            setOpen(false);
        }
    }))

    return (
        <Drawer width={640} open={open} placement="right" onClose={onClose} title={title}>
            {
                props.record && (
                   <>
                   <Space direction="vertical" size="middle" style={{ display: 'flex', marginBottom: 15 }}>
                       <Row justify={"center"}>
                           <Col span={12}>
                               <div><UserAddOutlined /> 创建人: {props.record.createdBy ?? '-'}</div>
                           </Col>
                           <Col span={12}>
                               <div><ClockCircleOutlined /> 创建时间: {props.record.createdAt ?? '-'}</div>
                           </Col>
                       </Row>
                       <Row justify={"center"}>
                           <Col span={12}>
                               <div><UsergroupAddOutlined /> 修改人: {props.record.updatedBy ?? '-'}</div>
                           </Col>
                           <Col span={12}>
                               <div><ClockCircleOutlined /> 修改时间: {props.record.updatedAt ?? '-'}</div>
                           </Col>
                       </Row>
                   </Space>
                   </>
                )
            }
            {children}
        </Drawer>
    );
})
export default BaseDrawer;