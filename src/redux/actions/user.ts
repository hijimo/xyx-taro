import { UserSSD, UserLoginData } from "@/types/User";
import {
  getCurrentUserInfo,
  login as loginService,
  logout as logoutService,
} from "@/services/user";
import { FETCH_CURRENT, USER_LOGIN, USER_LOGOUT } from "../constants/user";

// export const updateUserInfo = (userInfo: CurrentUser) => {
//   return {
//     type: UPDATE_USER_INFO,
//     payload: userInfo,
//   };
// };

// export const updateUserPhone = (userInfo: CurrentUser) => {
//   return {
//     type: UPDATE_USER_INFO,
//     payload: userInfo,
//   };
// };

// export const asyncUpdateUserPhone = (detail: any) => {
//   return async (dispatch) => {
//     const { encryptedData, iv } = detail;
//     const { success, data } = await bindWechatPhone({
//       encryptedData,
//       iv,
//     });
//     if (success) {
//       dispatch(updateUserPhone(data));
//     }
//   };
// };

// export const asyncUpdateUserInfo = (detail: any) => {
//   return async (dispatch) => {
//     const { encryptedData, iv } = detail;
//     const { success, data } = await bindWechatUserInfo({
//       encryptedData,
//       iv,
//     });
//     if (success) {
//       dispatch(updateUserInfo(data));
//     }
//   };
// };

export const fetchCurrent = () => {
  return async (dispatch) => {
    const { data, success } = await getCurrentUserInfo();
    if (success) {
      dispatch({
        type: FETCH_CURRENT,
        payload: data,
      });
    }
  };
};
export const login = (loginData: UserLoginData) => {
  return async (dispatch) => {
    const { data, success } = await loginService(loginData);
    if (success) {
      return dispatch({
        type: USER_LOGIN,
        payload: data,
      });
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    const { success } = await logoutService();
    if (success) {
      return dispatch({
        type: USER_LOGOUT,
      });
    }
  };
};
