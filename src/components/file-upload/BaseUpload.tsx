import React, { useEffect, useState } from 'react';
import { App, Button, Upload, type UploadFile, type UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { post } from '@/utils/http-request.ts';
import type { BaseResult, RequestParams } from '@/entity/common.ts';
import dayjs from 'dayjs';
import type { UploadChangeParam } from 'antd/es/upload/interface';
import { addFileUpload } from '@/api/system/file-upload.ts';

/**
 * @name: 名称
 * @description: TODO 上传组件-上传文件到阿里云
 * @author: mayn
 * @date: 2025/9/28 11:26
 */

// 组件支持的属性
export interface BaseUploadProps<T = any> extends UploadProps<T> {
  // oss上传专门配置
  // 阿里云oss配置
  bucket?: string;
  // 存储区域
  region?: string;
  // 存储空间
  host?: string;
  // 文件上传目录
  uploadDir?: string;
  // 阿里云上传地址
  endpoint?: string;
}

// 阿里云上传数据
interface OSSDataType {
  policy: string;
  dir: string;
  version: string;
  x_oss_credential: string;
  x_oss_date: string;
  signature: string;
  security_token: string;
  host: string;
  expire: string;
}

const BaseUpload: React.FC<BaseUploadProps> = function (props) {
  const time = dayjs().format('YYYY/MM/DD/');

  const { message } = App.useApp();

  const [OSSData, setOSSData] = useState<OSSDataType>();

  const init = async () => {
    try {
      const uploadData: RequestParams = {
        bucket: props.bucket,
        region: props.region,
        host: props.host,
        uploadDir: props.uploadDir ?? time,
      };
      const { data } = await post<BaseResult<OSSDataType>>(
        '/aliyun/get_post_signature_for_oss_upload',
        uploadData,
      );
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
    console.log('Aliyun OSS:', fileList);
    props.onChange?.([...fileList] as unknown as UploadChangeParam<UploadFile>);
  };

  const onRemove = (file: UploadFile) => {
    const files = (props.fileList || []).filter((v) => v.url !== file.url);
    props.onChange?.(files as unknown as UploadChangeParam<UploadFile>);
  };

  const getExtraData: UploadProps['data'] = (file) => {
    return {
      success_action_status: 200,
      policy: OSSData?.policy,
      'x-oss-signature': OSSData?.signature,
      'x-oss-signature-version': 'OSS4-HMAC-SHA256',
      'x-oss-credential': OSSData?.x_oss_credential,
      'x-oss-date': OSSData?.x_oss_date,
      key: file.url!,
      'x-oss-security-token': OSSData?.security_token,
    };
  };

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    await init();

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    // bucket和文件夹都交给前端来
    const filename = Date.now() + suffix;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    file.url = OSSData.dir + filename;

    // 新增文件上传记录
    addFileUpload({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      filePath: file.url,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length),
      remark: JSON.stringify({ dir: OSSData?.dir, host: OSSData?.host }) || '',
    });
    return file;
  };

  let uploadProps: object = props;

  async function handlerPreview(file: UploadFile) {
    const { data } = await post<BaseResult<string>>(`/aliyun/get_sts_credential`, {
      endpoint: props.endpoint,
      region: props.region,
      bucketName: props.bucket,
      objectName: file.url,
    });
    window.open(data);
  }

  uploadProps = {
    ...uploadProps,
    ...{
      name: 'file',
      action: OSSData?.host,
      onRemove,
      data: getExtraData,
      beforeUpload,
      onChange: handleChange,
    },
  };

  return (
    <Upload {...uploadProps} onPreview={handlerPreview}>
      {props.children ? props.children : <Button icon={<UploadOutlined />}>点击上传</Button>}
    </Upload>
  );
};
export default BaseUpload;
