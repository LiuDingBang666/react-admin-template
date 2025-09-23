/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 14:12
 */
import {Row} from "antd";
import '@/assets/styles/crud.scss'
export default function DemoCrud() {
    return (
        <>
            <Row className="search">查询</Row>
            <Row className="table">表格</Row>
            <Row className="page-operator">分页</Row>
        </>
    );
}
