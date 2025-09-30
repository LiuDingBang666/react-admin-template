/**
 * @name: 名称
 * @description: TODO 数据详情组件
 * @author: mayn
 * @date: 2025/9/28 11:23
 */
import React, {type ReactElement} from "react";
import {Col, Divider, Row} from "antd";
import type {BaseEntity} from "@/entity/common.ts";

export interface FormDetailProps<T extends BaseEntity>  {
    record: T | null
    config?: FormDetailConfigProps<BaseEntity>[] | null | undefined
}
export interface FormDetailConfigProps<T extends BaseEntity> {
    title: string
    items: Array<FormItemProps<T>>
}

interface FormItemProps<T> {
    title: string
    column: string
    render?: (record: T) => ReactElement
}


const FormDetail: React.FC<FormDetailProps<BaseEntity>> = function FormDetail({ record, config }) {
    return (
        <>
            {
                record && config && config.map((group, groupIdx, groups) => {
                    return (<>
                        {group.title &&   <p className="site-description-item-profile-p">{group.title}</p>}
                        <Row>
                            {
                                group.items.map((item) => {
                                    return   <Col span={12} key={item.title}  style={{marginBottom: 10}}>
                                        <span className="site-description-item-profile-p-label" style={{marginRight: 8, fontWeight: "bold"}}>{item.title}:</span>
                                        {  (item.render ? item.render(record) : record[item.column] ?? '-') as ReactElement}
                                    </Col>
                                })
                            }
                        </Row>
                        { groupIdx < groups.length - 1 && <Divider />}
                    </>)
                })
            }
        </>
    )

}
export default FormDetail;