import type { PaginationParams, SSDBase } from "./common";
import type { BooleanEnum, OnlineStatusEnum } from "@/enums";

export interface DeviceMetaSSD extends SSDBase {
  /**
   * 数据类型
   */
  dataType: string;
  metaUnit: string | null;
  /**
   * 元属性key
   */
  metaKey: string;
  /**
   * 元属性名称
   */
  metaName: string;
  /**
   * 最新元属性值
   */
  metaValue: string;
}
export interface DeviceSSD extends SSDBase {
  deviceDto: DeviceItemSSD;
  /**
   * 是否显示控制区按钮 1=是 0=否
   */
  orderFlag?: BooleanEnum;
  /**
   * 是否显示解绑按钮 1=是 0=否
   */
  unbindFlag?: BooleanEnum;
  /**
   * 扩展属性
   */
  metaDtos?: DeviceMetaSSD[];
  /**
   * 控制区
   */
  orderDtos?: DeviceMetaSSD[];
}
export interface DeviceItemSSD {
  /**
   * 设备别名
   */
  aliasName: string;
  /**
   * 城市
   */
  cityName: string;
  /**
   * 设备编号
   */
  deviceCode: string;
  /**
   * 所在分组
   */
  groupName: string;
  groupCode: string;
  /**
   * 设备id
   */
  id: number;
  /**
   * 在线状态
   */
  onlineStatus: OnlineStatusEnum;
  onlineStatusText?: string;
  /**
   * 省份
   */
  provinceName: string;
  /**
   * 是否有解绑权限
   */
  unbindFlag?: BooleanEnum;
}
export interface DeviceHistoryItemSSD {
  /**
   * 设备别名
   */
  aliasName: string;
  /**
   * 设备编号
   */
  deviceCode: string;
  /**
   * 设备数据
   */
  metaData: string;
  /**
   * 上报日期
   */
  postDate: string;
  /**
   * 上报时间
   */
  postTime: string;
}
export interface DeviceInstanceSSD {
  /**
   * 实例ID
   */
  instanceId: number;
  /**
   * 实例自定义名称
   */
  instanceName: string;
}

export interface DeviceListParams extends PaginationParams {
  cityName?: string;
  provinceName?: string;
  onlineStatus?: OnlineStatusEnum;
  groupCode?: string;
  keyWord?: string;
  gmtCreateBegin?: string;
  gmtCreateEnd?: string;
}
export interface DeviceActiveParams {
  /**
   * 	设备别名
   */
  aliasName: string;
  /**
   * 设备所属分组编号
   */
  groupCode: string;
  /**
   * 设备二维码内容
   */
  imei: string;
  /**
   * 设备所属实例ID
   */
  instanceId: number;
}
export interface SendDeviceInstructionParams {
  /**
   * 设备编号
   */
  deviceCode: string;
  /**
   * 设备id
   */
  id: number;
  /**
   * 设备属性key
   */
  metaKey: string;
  /**
   * 设备属性设置值
   */
  metaValue: string;
}
export interface EditDeviceInfoParams {
  /**
   * 设备别名
   */
  aliasName: string;
  /**
   * 所属分组编号
   */
  groupCode: string;
  id: number;
}
export interface DeviceLogListParams extends PaginationParams {
  keyWord?: string;
}

export interface DeviceLogSSD extends SSDBase {
  /**
   * 设备别名
   */
  aliasName: string;
  /**
   * 业务类型1=激活 2=上线 3=离线
   */
  businessType: number;
  /**
   * 设备ID
   */
  code: string;
  /**
   * 所属企业名称
   */
  companyName: string;
  /**
   * 所属企业编号
   */
  companyNo: string;
  /**
   * 所属分组编号
   */
  groupCode: string;
  /**
   * 主键ID
   */
  id: number;
  /**
   * 所属企业实例ID
   */
  instanceId: number;
  /**
   * 所属企业实例名称
   */
  instanceName: string;
  /**
   * 设备编号
   */
  name: string;
  /**
   * 产品唯一标识 */
  productKey: string;
  /**
   * 产品名称
   */
  productName: string;
}
