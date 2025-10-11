/**
 * @name: 名称
 * @description: TODO 通用实体
 * @author: mayn
 * @date: 2025/9/28 10:06
 */

// 通用返回结果
interface BaseResult<T> {
  // 状态码
  code: number;
  // 提示信息
  message: string;
  // 数据
  data: T;
  // 其他
  [key: string]: unknown;
}

// 分页参数
interface BasePageParams {
  // 当前页码
  pageNum: number;
  // 每页条数
  pageSize: number;
}

// 请求参数，继承分页参数
interface RequestParams extends Partial<BasePageParams> {
  [key: string]: unknown;
}

// 分页返回结果，继承分页参数
interface BasePage<T> extends BasePageParams {
  // 总数
  total: number;
  // 数据
  list: Array<T>;
  // 总页数
  size: number;
  // 开始行
  startRow: number;
  // 结束行
  endRow: number;
  // 是否分页
  pages: number;
  // 其他
  prePage: number;
  // 下一页
  nextPage: number;
  // 是否第一页
  isFirstPage: boolean;
  // 是否最后一页
  isLastPage: boolean;
  // 是否有上一页
  hasPreviousPage: boolean;
  // 是否有下一页
  hasNextPage: boolean;
  // 导航页码数
  navigatePages: number;
  // 所有导航页号
  navigatepageNums: Array<number>;
  // 第一页
  navigateFirstPage: number;
  // 最后一页
  navigateLastPage: number;
}

interface BaseEntity {
  // 主键
  id: string;
  // 创建时间
  createdAt: string;
  // 修改时间
  updatedAt: string;
  // 创建人
  createdBy: string;
  // 修改人
  updatedBy: string;
  // 逻辑删除标志
  deleted: number;
  // 版本号
  version: number;
  // 备注
  remark: string;
  // 其他字段
  [key: string]: unknown;
}

export type { BaseResult, BasePage, BasePageParams, RequestParams, BaseEntity };
