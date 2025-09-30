import React, {useEffect, useState} from "react";
import  {App, Button, Upload, type UploadFile, type UploadProps} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {get} from "@/utils/http-request.ts";
import type {BaseResult} from "@/entity/common.ts";

/**
 * @name: 名称
 * @description: TODO 上传组件-上传文件到阿里云
 * @author: mayn
 * @date: 2025/9/28 11:26
 */


// 组件支持的属性
export interface BaseUploadProps extends UploadProps{
    value?: UploadFile[];
    onChange?: (fileList: UploadFile[]) => void;
}

// 阿里云上传数据
interface OSSDataType {
    policy: string
    dir: string;
    version: string
    x_oss_credential: string
    x_oss_date: string
    signature: string
    security_token: string
    host: string
    expire: string
}



const BaseUpload: React.FC<BaseUploadProps> = function (props) {
    const { message } = App.useApp();

    const [OSSData, setOSSData] = useState<OSSDataType>();

    const init = async () => {
        try {
            const {data} = await get<BaseResult<OSSDataType>>('/aliyun/get_post_signature_for_oss_upload');
            setOSSData(data);
        } catch (err) {
            if (err instanceof Error) {
                message.error(err.message);
            }
        }
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        fileList.forEach((file) => {
            if (file.status === 'done' && (file.url?.indexOf('https://') === -1 || file.url?.indexOf('http://') === -1)) {
                file.url = `https://oss.www.xndb.net.cn/${file.url}`;
            }
        })
        console.log('Aliyun OSS:', fileList);
        props.onChange?.([...fileList]);
    };

    const onRemove = (file: UploadFile) => {
        const files = (props.value || []).filter((v) => v.url !== file.url);
        props.onChange?.(files);
    };

    const getExtraData: UploadProps['data'] = (file) => ({
        success_action_status: 200,
        policy: OSSData?.policy,
        "x-oss-signature": OSSData?.signature,
        "x-oss-signature-version": "OSS4-HMAC-SHA256",
        "x-oss-credential": OSSData?.x_oss_credential,
        "x-oss-date": OSSData?.x_oss_date,
        key: OSSData?.dir + file.name,
        "x-oss-security-token": OSSData?.security_token
    });

    const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
        await init();

        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        const filename = Date.now() + suffix;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        file.url = OSSData.dir + filename;

        return file;
    };

    let uploadProps: object = props

    uploadProps = {
        ...uploadProps,
        ...{
            name: 'file',
                fileList: props.value,
            action: OSSData?.host,
            onRemove,
            data: getExtraData,
            beforeUpload,
            onChange: handleChange,
        }
    };

    return (
        <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
    );
}
export default BaseUpload;