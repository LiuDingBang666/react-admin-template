import type {BaseFormItemProps} from "@/components/form/BaseFormItem.tsx";
import type {LoginLog} from "@/entity/system/login-log.ts";

const searchs : Array<BaseFormItemProps<LoginLog>> = [
    {
        name: "username",
        label: "用户名",
        type: "Input",
    },
    {
        name: "ip",
        label: "IP地址",
        type: "Input",
    },
    {
        name: "location",
        label: "登录地点",
        type: "Input",
    }
]

export default searchs;