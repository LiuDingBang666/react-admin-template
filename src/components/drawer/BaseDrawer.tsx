/**
 * @name: 名称
 * @description: TODO 数据详情组件
 * @author: mayn
 * @date: 2025/9/28 11:23
 */
import  {forwardRef, type JSX, useImperativeHandle, useState} from "react";
import {Drawer} from "antd";
import type {BaseEntity} from "@/entity/common.ts";

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
        <Drawer width={640} open={open} placement="right" onClose={onClose}>
            <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                {title}
            </p>
            {children}
        </Drawer>
    );
})
export default BaseDrawer;