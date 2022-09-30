export enum UserType {
  /**
   * 普通员工
   */
  Normarl = 0,
  /**
   * 企业管理员
   */
  EnterPriseAdmin = 1,
  /**
   * 平台管理员
   */
  PlatformAdmin = 2,
  /**
   * 临时人员
   */
  Template = 3,
}
export enum UserAudit {
	/**
	 * 待审核
	 */
	Audit = 1,
	/**
	 * 审核通过
	 */
	AuditSuccess = 2,
	/**
	 * 审核不通过
	 */
	AuditFailed = 3,
}