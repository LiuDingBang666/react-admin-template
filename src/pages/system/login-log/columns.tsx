import type {TableProps} from "antd";
import type {LoginLog} from "@/entity/system/login-log.ts";

/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/28 15:57
 */

const columns:TableProps<LoginLog>['columns'] = [
    {
        title: "登录账号",
        dataIndex: "username",
        key: "username",
        width: 120
    },

    {
        title: "登录时间",
        dataIndex: "loginTime",
        key: "loginTime",
    },
    {
        title: "登录状态",
        dataIndex: "status",
        width: 120,
        key: "status",
        render: (status: number) => {
            if (status === 1) {
                return <span style={{color: "green"}}>登录成功</span>
            } else {
                return <span style={{color: "red"}}>登录失败</span>
            }
        }
    },
    {
        title: "登录IP",
        dataIndex: "ip",
        key: "ip",
    },
    {
        title: "浏览器类型",
        dataIndex: "browser",
        key: "browser",
        width: 300,
    },
    {
        title: "操作系统",
        dataIndex: "os",
        key: "browser",
        width: 120,
    },
    // {
    //     title: "登录地点",
    //     dataIndex: "loginLocation",
    //     key: "loginLocation",
    //     width: 120
    // },
    // {
    //     title: "提示信息",
    //     dataIndex: "msg",
    //     key: "msg",
    //     width: 120,
    // },
]

export default columns;