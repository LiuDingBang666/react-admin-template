/**
 * @name: 名称
 * @description: TODO 导入组件-直接上传文件
 * @author: mayn
 * @date: 2025/9/28 11:27
 */
import React from 'react';
import { Button, Dropdown, type MenuProps, message, Upload, type UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { BaseResult } from '@/entity/common.ts';

interface ImportBtnProps extends Omit<UploadProps, 'action'> {
  // 下载模板方法，返回一个文件流
  templateAction?: () => Promise<Blob>;
  // 导入文件方法
  importAction?: (params: FormData) => Promise<BaseResult<boolean>>;
}
const ImportBtn: React.FC<ImportBtnProps> = function (props) {
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          下载模板
        </a>
      ),
    },
  ];

  const onClick: MenuProps['onClick'] = () => {
    if (props.templateAction == null) {
      message.error('请传入模板下载方法');
      return;
    }
    props
      .templateAction()
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '模板文件.xlsx'); //or any other extension
        document.body.appendChild(link);
        link.click();
        message.success('模板下载成功');
      })
      .catch(() => {
        message.error('模板下载失败');
      });
  };

  function beforeUpload(file: File) {
    // 表单上传
    if (props.importAction == null) {
      message.error('请传入文件上传方法');
      return false;
    }
    const form = new FormData();
    form.append('file', file);
    props.importAction(form).then(({ data, message: msg }) => {
      if (data) {
        message.success(`导入成功`);
      } else {
        message.error(`导入失败:${msg}`);
      }
    });
    return false;
  }

  return (
    <>
      <Dropdown menu={{ items, onClick }} placement="bottomLeft" arrow>
        <Upload {...props} beforeUpload={beforeUpload} maxCount={1} showUploadList={false}>
          <Button type={'primary'} icon={<UploadOutlined />}>
            导入
          </Button>
        </Upload>
      </Dropdown>
    </>
  );
};

export default ImportBtn;
