import type {BaseFormItemProps} from "@/components/form/BaseFormItem.tsx";
import type {LoginLog} from "@/entity/system/login-log.ts";
import {message} from "antd";

const fields : Array<BaseFormItemProps<LoginLog>> = [
    {
        name: "username",
        label: "用户名",
        type: "Input",
    },
    {
        name: "ip",
        label: "登录IP",
        type: "Input",
    },
    {
        name: "location",
        label: "登录地点",
        type: "Input",
    },
    {
        name: "status",
        label: "登录状态",
        type: "Select",
        props: {
            options: [
                {
                    label: "登录成功",
                    value: 1
                },
                {
                    label: "登录失败",
                    value: 0
                }
            ]
        }
    },
    {
        name: "file",
        label: "登录日志",
        type: "Upload",
        placeholder: "请上传登录日志",
        props: {
            name: 'file',
            action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
            headers: {
                authorization: 'authorization-text',
            },
            // onChange(info) {
            //     if (info.file.status !== 'uploading') {
            //         console.log(info.file, info.fileList);
            //     }
            //     if (info.file.status === 'done') {
            //         message.success(`${info.file.name} file uploaded successfully`);
            //     } else if (info.file.status === 'error') {
            //         message.error(`${info.file.name} file upload failed.`);
            //     }
            // },
        }
    }
]

export default fields;