import { getSetting, requestSubscribeMessage } from "@tarojs/taro";
import { MessageTemplateType } from "@/enums";

export const hasNoticeAuthorize = async (
  messageTplTypeList: MessageTemplateType[]
) => {
  return new Promise((resolve, reject) => {
    try {
      getSetting({
        withSubscriptions: true,
        success(res) {
          const { itemSettings } = res.subscriptionsSetting;
          if (itemSettings !== undefined && itemSettings !== null) {
            let t = true;
            messageTplTypeList.every((it) => {
              t = itemSettings[it] === "accept";
              return t;
            });
            resolve(t);
          } else {
            resolve(false);
          }
        },
      });
    } catch (ex) {
      reject(ex);
    }
  });
};
export const requestNoticeAuthorize = (tmplIds) => {
  return new Promise((resolve, reject) => {
    requestSubscribeMessage({
      tmplIds,
      success(res) {
        let t = true;
        Object.keys(res).every((key) => {
          t = res[key] === "reject" ? false : true;
          return t;
        });
        resolve(t);
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

/**
 * 访客是否拥有拜访、被邀请通知权限-- 访客发起拜访申请
 * @returns
 */
export const hasVisitAuthorize = async () => {
  return hasNoticeAuthorize([
    MessageTemplateType.VisitResult,
    MessageTemplateType.BeInvited,
  ]);
};
/**
 * 申请访客拜访、被邀请通知权限-- 访客发起拜访申请
 * @returns
 */
export const requestVisitAuthorize = async () => {
  return requestNoticeAuthorize([
    MessageTemplateType.BeInvited,
    MessageTemplateType.VisitResult,
  ]);
};

/**
 * 员工是否拥有预约日程提醒、到访通知权限--员工邀请访客
 * @returns
 */
export const hasStaffVisitAuthorize = async () => {
  return hasNoticeAuthorize([
    MessageTemplateType.VisitReminder,
    MessageTemplateType.Visit,
  ]);
};
/**
 * 申请员工预约日程提醒、到访通知权限--员工邀请访客
 * @returns
 */
export const requestStaffVisitAuthorize = async () => {
  return requestNoticeAuthorize([
    MessageTemplateType.VisitReminder,
    MessageTemplateType.Visit,
  ]);
};
/**
 * 是否拥有订单发货通知--员工下单积分、食堂、超市、团餐
 * @returns
 */
export const hasOrderDeliveryAuthorize = async () => {
  return hasNoticeAuthorize([
    MessageTemplateType.OrderCancel,
    MessageTemplateType.OrderDelivery,
    MessageTemplateType.OrderClose,
  ]);
};
/**
 * 申请订单发货通知权限--员工下单积分、食堂、超市、团餐
 * @returns
 */
export const requestOrderDeliveryAuthorize = async () => {
  return requestNoticeAuthorize([
    MessageTemplateType.OrderCancel,
    MessageTemplateType.OrderDelivery,
    MessageTemplateType.OrderClose,
  ]);
};
/**
 * 是否拥有顾客下单通知--超市、团餐、积分、食堂 接收顾客下单
 * @returns
 */
export const hasOrderPostAuthorize = async () => {
  return hasNoticeAuthorize([MessageTemplateType.OrderPost]);
};
/**
 * 申请顾客下单通知权限--超市、团餐、积分、食堂 接收顾客下单
 * @returns
 */
export const requestOrderPostAuthorize = async () => {
  return requestNoticeAuthorize([MessageTemplateType.OrderPost]);
};

/**
 * 是否拥有工单处理通知--员工发起工单
 * @returns
 */
export const hasWorkOrderConfirmAuthorize = async () => {
  return hasNoticeAuthorize([MessageTemplateType.WorkOrderConfirm]);
};
/**
 * 申请工单处理通知权限--员工发起工单
 * @returns
 */
export const requestWorkOrderConfirmAuthorize = async () => {
  return requestNoticeAuthorize([MessageTemplateType.WorkOrderConfirm]);
};

/**
 * 是否拥有工单通知--工单负责人接收到工单、工单流转
 * @returns
 */
export const hasWorkOrderAuthorize = async () => {
  return hasNoticeAuthorize([
    MessageTemplateType.WorkOrder,
    MessageTemplateType.WorkOrderTransfer,
  ]);
};
/**
 * 申请工单通知权限--工单负责人接收到工单、工单流转
 * @returns
 */
export const requestWorkOrderAuthorize = async () => {
  return requestNoticeAuthorize([
    MessageTemplateType.WorkOrder,
    MessageTemplateType.WorkOrderTransfer,
  ]);
};

/**
 * 是否订单结果通知--员工发起团餐
 * @returns
 */
export const hasOrderResultAuthorize = async () => {
  return hasNoticeAuthorize([
    MessageTemplateType.OrderSuccess,
    MessageTemplateType.OrderClose,
    MessageTemplateType.OrderCancel,
  ]);
};
/**
 * 申请订单结果权限--员工发起团餐
 * @returns
 */
export const requestOrderResultAuthorize = async () => {
  return requestNoticeAuthorize([
    MessageTemplateType.OrderSuccess,
    MessageTemplateType.OrderClose,
    MessageTemplateType.OrderCancel,
  ]);
};
