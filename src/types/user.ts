import { BooleanEnum, SwitchEnum, SexEnum } from "@/enum";
import type { SSDBase, RoleSSD, DeptSSD } from "@/types";
export interface UserSSD extends SSDBase {
  /**
   * 菜单集合
   */
  menuList: [];
  /**
   * 权限按钮集合
   */
  permissionList: [];
  /**
   * 用户所在公司
   */
  companyNo: string;
  /**
   * 用户所在部门
   */
  deptDto: DeptSSD;
  /**
   * 角色集合
   */
  roleDtos: RoleSSD[];
  /**
   * 是否删除 0=否 1=是
   */
  deleteFlag: BooleanEnum;
  /**
   * 组织编号
   */
  deptNo: string;
  /**
   * 上级No
   */
  parentNo: string;
  /**
   * 用户注册来源 0后台添加 1其它
   */
  registerSource: number;
  /**
   * 备注
   */
  remark: string;
  /**
   * 用户账号（手机号）
   */
  userAccount: string;
  /**
   * 用户生日
   */
  userBirthday: string;
  /**
   * 邮箱
   */
  userEmail: string;
  /**
   * 手机号
   */
  userMobile: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 用户No
   */
  userNo: string;
  /**
   * 密码
   */
  userPassword: string;
  /**
   * 头像
   */
  userPhoto: string;
  /**
   * 用户性别 1男 2女	integer(int32)
   */
  userSex: SexEnum;
  /**
   * 状态 0=禁用 1=启用
   */
  userStatus: SwitchEnum;
  id: number;
}
export interface UserItemSSD extends UserSSD {}

/**
 * 1未认证 2已认证
 */
export type AuthType = 1 | 2; // 1未认证 2已认证

export interface UserMenuParams {
  resourceType: number;
}

export interface UserMenuItemSSD {
  resourceId: number;
  value: number;
  resourceIcon: string | null;
  resourceKey: string;
  resourceName: string;
  title: string;
  resourceStatus: number;
  resourceStatusText: string;
  resourceUrl: string;
  orderNum: number;
  parentId: number;
  children: UserMenuItemSSD[] | null;
  resourceType: number;
  resourceTypeText: string;
}

export interface UserLoginResponseData {
  /**
   * 登陆令牌
   */
  accessToken: string;
  companyInfo: {
    auditStatus: number;
    basicInfoStatus: number;
    companyId: number;
    companyName: string;
    companyNameEng: string;
    companyNo: string;
    companyStatus: number;
    companyType: number;
    parkId: number;
  };
  timeout: number;
  updateTime: number;
  userInfo: UserSSD;
}

export interface UserLoginData {
  loginName: string;
  loginPassword: string;
  webFlag?: boolean;
}

export interface UpdateUserPasswordParams {
  oldPassword: string;
  newPassword: string;
  id: number;
}
export interface RegisterUserParams {
  captcha: string;
  companyNo: string;
  userMobile: string;
  userPassword: string;
}
