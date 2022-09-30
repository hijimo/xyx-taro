export enum OnlineStatusEnum {
  OFFLINE = "offline",
  ONLINE = "online",
}
export enum BooleanEnum {
  FALSE = 0,
  TRUE,
}
export enum InstructionTypeEnum {
  BOOL = "BOOL",
  INT = "INT",
}
export enum NormalStatusEnum {
  ABNORMAL = 0,
  NORMAL,
}

export enum LoginTypeEnum {
  WEB = 1,
  APP = 2,
}
export enum SexEnum {
  MALE = 1,
  FEMALE = 2,
}
export enum BusinessTypeEnum {
  OTHER = 0,
  ADD = 1,
  EDIT = 2,
  DELETE = 3,
}

export const OnlineStatusDesc = {
  [OnlineStatusEnum.OFFLINE]: { text: "离线" },
  [OnlineStatusEnum.ONLINE]: { text: "在线" },
};
// 默认状态
export const BooleanDesc = {
  [BooleanEnum.FALSE]: { text: "否" },
  [BooleanEnum.TRUE]: { text: "是" },
};
export const NormalStatusDesc = {
  [NormalStatusEnum.ABNORMAL]: { text: "异常", status: "Error" },
  [NormalStatusEnum.NORMAL]: { text: "正常", status: "Success" },
};
export enum SwitchEnum {
  DISABLED = 0,
  ENABLED,
}
// 禁用状态
export const SwitchDesc = {
  [SwitchEnum.ENABLED]: { text: "启用", status: "Success" },
  [SwitchEnum.DISABLED]: { text: "禁用", status: "Error" },
};

export const SexDesc = {
  [SexEnum.MALE]: { text: "男" },
  [SexEnum.FEMALE]: { text: "女" },
};
export const BusinessTypeDesc = {
  [BusinessTypeEnum.OTHER]: { text: "其他" },
  [BusinessTypeEnum.ADD]: { text: "新增" },
  [BusinessTypeEnum.EDIT]: { text: "修改" },
  [BusinessTypeEnum.DELETE]: { text: "删除" },
};
// 资源类型
export enum ResourceType {
  MENU,
  BUTTON,
}

export const ResourceTypeDesc = {
  [ResourceType.MENU]: "菜单",
  [ResourceType.BUTTON]: "按钮",
} as const;
