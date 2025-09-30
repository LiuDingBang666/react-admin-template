import React, {useEffect, useState} from "react";
import  {App, Button, Upload, type UploadFile, type UploadProps} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {get, post} from "@/utils/http-request.ts";
import type {BaseResult} from "@/entity/common.ts";
import dayjs from "dayjs";

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

    const time = dayjs().format('YYYY/MM/DD/')


    const { message } = App.useApp();

    const [OSSData, setOSSData] = useState<OSSDataType>();

    const init = async () => {
        try {
            const {data} = await post<BaseResult<OSSDataType>>('/aliyun/get_post_signature_for_oss_upload');
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

    const getExtraData: UploadProps['data'] = (file) =>  {
        return {
            success_action_status: 200,
            policy: OSSData?.policy,
            "x-oss-signature": OSSData?.signature,
            "x-oss-signature-version": "OSS4-HMAC-SHA256",
            "x-oss-credential": OSSData?.x_oss_credential,
            "x-oss-date": OSSData?.x_oss_date,
            key: file.url!,
            "x-oss-security-token": OSSData?.security_token
        };
    }

    const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
        await init();

        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        // bucket和文件夹都交给前端来
        const filename = time + Date.now() + suffix;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        file.url = OSSData.dir + filename;
        console.log(file.url)

        return file;
    };

    let uploadProps: object = props


    async function handlerPreview(file: UploadFile) {
        console.log(file)
        const { data } = await post<BaseResult<string>>(`/aliyun/get_sts_credential`, {
                endpoint: 'https://oss.www.xndb.net.cn',
                region: 'cn-hangzhou',
                bucketName: 'xndb-admin',
                objectName: file.url?.replace('https://oss.www.xndb.net.cn/', ''),
                expireTime: (dayjs().add(1, 'hour').unix() * 1000).toString()
        })
        window.open(data)
    }

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
        <Upload {...uploadProps} onPreview={handlerPreview}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
    );
}
export default BaseUpload;