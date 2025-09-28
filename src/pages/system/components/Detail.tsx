/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 17:37
 */
import {Col, Divider, Row} from "antd";
import {Detail} from "@/components/detail/Detail.tsx";
import type {BaseEntity} from "@/entity/common.ts";

interface DescriptionItemProps<T extends BaseEntity> {
    record: T
}


export default function DataDetail(props: DescriptionItemProps) {
    return (
        <>
            <p className="site-description-item-profile-p">Personal</p>
            <Row>
                <Col span={12}>
                    <Detail title="Full Name" content="Lily" />
                </Col>
                <Col span={12}>
                    <Detail title="Account" content="AntDesign@example.com" />
                </Col>
            </Row>
            <Divider />
        </>
    )
}