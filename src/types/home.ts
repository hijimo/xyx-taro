interface SimpleDeviceSSD {
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
export interface HomeSSD {
  /**
   * 企业名称
   */
  companyName: string;
  /**
   * 企业编号
   */
  companyNo: string;
  /**
   * 最新数据
   */
  deviceDataList: {
    records: SimpleDeviceSSD[];
  };
  /**
   * 离线设备数
   */
  offlineCount: number;
  /**
   * 在线设备数
   */
  onlineCount: number;
  /**
   * 总设备数
   */
  totalCount: number;
}
