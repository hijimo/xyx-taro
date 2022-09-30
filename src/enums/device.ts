export enum LogBusinessTypeEnum {
  ACTIVED = 1,
  ONLINE = 2,
  OFFLINE = 3,
  // 业务类型1=激活 2=上线 3=离线
}
export const LogBusinessTypeDesc = {
  [LogBusinessTypeEnum.OFFLINE]: { text: "离线" },
  [LogBusinessTypeEnum.ONLINE]: { text: "在线" },
  [LogBusinessTypeEnum.ACTIVED]: { text: "激活" },
};
