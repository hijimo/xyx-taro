import type {
  UserSSD,
  UserLoginData,
  UserLoginResponseData,
  UpdateUserPasswordParams,
  ResponseData,
} from "@/types";
import request from "@/utils/request";
export const fetchTokenUrl = "/api/x1x/wx/miniProgram/login/";
export function getTokenByCode(code: string) {
  return request(`${fetchTokenUrl}${code}`, { NO_TOKEN: true });
}
// 获取用户信息
export function getCurrentUserInfo() {
  return request("/api/x1x/wx/userInfo");
}

interface WechatEncryptedData {
  encryptedData?: string;
  encryptData?: string;
  iv: string;
}

export function bindWechatPhone(data: WechatEncryptedData) {
  return request<ResponseData>("/api/x1x/wx/miniProgram/phone/decrypt", {
    method: "POST",
    data,
  });
}

export function bindWechatUserInfo(data: WechatEncryptedData) {
  return request<ResponseData>("/api/x1x/wx/miniProgram/user/decrypt", {
    method: "POST",
    data,
  });
}

// 用户订单数量
export function getMyOrderCount() {
  return request("/app/zeus/my/order/count");
}

export function PostEditPassword({ userId, password }) {
  return request("/api/system/user/resetPwd", {
    method: "POST",
    data: {
      userId,
      password,
    },
  });
}
