/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 17:37
 */
import {Col, Divider, Row} from "antd";
import DescriptionItem from "@/components/form/description-item.tsx";

export default function Detail() {
    return (
        <>
            <p className="site-description-item-profile-p">Personal</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Full Name" content="Lily" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Account" content="AntDesign@example.com" />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="City" content="HangZhou" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Country" content="China🇨🇳" />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Birthday" content="February 2,1900" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Website" content="-" />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <DescriptionItem
                        title="Message"
                        content="Make things as simple as possible but no simpler."
                    />
                </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Company</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Position" content="Programmer" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Responsibilities" content="Coding" />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Department" content="XTech" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <DescriptionItem
                        title="Skills"
                        content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                    />
                </Col>
            </Row>
            <Divider />
            <p className="site-description-item-profile-p">Contacts</p>
            <Row>
                <Col span={12}>
                    <DescriptionItem title="Email" content="AntDesign@example.com" />
                </Col>
                <Col span={12}>
                    <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <DescriptionItem
                        title="Github"
                        content={
                            <a href="http://github.com/ant-design/ant-design/" target="_blank" rel="noreferrer">
                                github.com/ant-design/ant-design/
                            </a>
                        }
                    />
                </Col>
            </Row>
        </>
    )
}