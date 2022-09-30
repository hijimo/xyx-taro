import { NormalStatusEnum, BusinessTypeEnum } from "@/enums";

export interface SSDBase {
  /**
   * 创建时间
   */
  gmtCreate?: string;
  /**
   * 创建人
   */
  creator?: string;
  /**
   * 修改人
   */
  modifier?: string;
  /**
   * 最后变更时间
   */
  gmtModified?: string;
}

export interface PaginationParams {
  total?: number;
  totalCount?: number;
  pageSize?: number;
  pageNo?: number;
  current?: number;
}

export interface Attachment {
  cover?: string;
  name?: string;
  size?: string;
  status?: string;
  type?: string;
  uid?: string;
  url?: string;
}
export interface TabStatisticsItemSSD {
  count: number;
  name: string;
  value: number;
}

export interface AddressSSD {
  children: AddressSSD[];
  id: number;
  level: number;
  /**
   * 英文名
   */
  name: string;
  /**
   * 英文名 */
  nameEn: string;
  /**
   * 当地语言名称
   *  */
  nameLocal: string;
  pid: number;
}

export interface LogSSD extends SSDBase {
  /**
   * 业务类型0=其它1=新增2=修改3=删除
   */
  businessType: BusinessTypeEnum;
  /**
   * 企业名称
   */
  companyName: string;
  /**
   * 部门名称
   */
  deptName: string;
  /**
   * 错误信息
   */
  errorMsg: string;
  /**
   * 返回参数
   */
  jsonResult: string;
  /**
   * 请求方法
   */
  method: string;
  /**
   * 请求IP */
  operIp: string;
  /**
   * 请求参数
   */
  operParam: string;
  /**
   * 请求地址
   */
  operUrl: string;
  /**
   * 操作人类别 */
  operatorType: number;
  /**
   * 请求方式
   */
  requestMethod: string;
  /**
   * 状态0=异常1=正常
   */
  status: NormalStatusEnum;
  /**
   * 操作模块
   */
  title: string;
}

export interface OptionItemSSD {
  value: number | string;
  label: string;
}

export interface Mappable {
  resourceKey?: string | null;
}

export interface Flattenable<T> {
  children?: T[] | null;
}

export type MapFlattenable<T> = Mappable & Flattenable<T>;

export interface PageParams {
  pageNo?: number;
  pageSize?: number;
}

export interface DictTypeSSD {
  dicCode: string;
  dicName: string;
  dicState: number;
  dicValue: string;
  gmtCreate: string;
  gmtModified: string;
  id: number;
}
export interface ResponseData<T = any> {
  data: T;
  retCode: string;
  retMsg: string;
  success: boolean;
  timestamp: number;
  traceId: null | string;
}
export interface PaginationData<T = any> {
  limit: number;
  offset: number;
  pageNo: number;
  pageSize: number;
  pages: number;
  records: T;
  totalCount: number;
}

export interface RefreshOption {
  needRefresh: boolean;
  immediate: boolean;
}

export interface Address {
  /**
   * 收货人姓名
   */
  userName: string;
  /**
   * 邮编
   */
  postalCode: string;
  /**
   * 国标收货地址第一级地址
   */
  provinceName: string;
  /**
   * 国标收货地址第二级地址
   */
  cityName: string;
  /**
   * 国标收货地址第三级地址
   */
  countyName: string;
  /**
   * 详细收货地址信息
   */
  detailInfo: string;
  /**
   * 收货地址国家码
   */
  nationalCode: string;
  /**
   * 收货人手机号码
   */
  telNumber: string;
  /**
   * 错误信息
   */
  errMsg: string;
}
export interface FreeMachine {
  cabinetId: number;
  latticeId: number;
  machineUuid: number;
}
